
const express = require('express');
const morgan = require('morgan');
const ejs = require('ejs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const blogRoute = require('./routes/blogRoute');
const { render } = require('express/lib/response');

// create .env config
dotenv.config();

//express app
const app = express();

//register view engine
app.set('view engine','ejs');

//connect mongodb
mongoose.connect(process.env.MONGO_URI)
.then((result)=>console.log("Database connection successful"))
.catch(err=> console.log(err));

//listent to request
app.listen(process.env.PORT);

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

//Route to blogs
app.use('/blogs',blogRoute);

//Route Home Page to /blogs
app.get('/', (req,res)=> res.redirect('/blogs'));


//About Page
app.get('/about', (req,res)=>res.render('about', {title: 'About Us'}));

//404 page - catch all
app.use((req,res) => {
    res.status(400).render('404',{title: '404'});
})