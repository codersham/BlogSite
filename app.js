
const express = require('express');
const morgan = require('morgan');
const ejs = require('ejs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Blog =  require('./models/blog');
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
.catch((err)=> console(err));

//listent to request
app.listen(process.env.PORT);

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

/* Start of Routes */

//Route Home Page to /blogs
app.get('/', (req,res)=> res.redirect('/blogs'));


//get all blogs
app.get('/blogs',(req,res)=> {
    Blog.find().sort({createdAt: -1})
    .then((result)=> res.render('index', {title : 'All Blogs', blogs: result}))
    .catch((err)=> console.log(err))
});

// handle create blog POST method
app.post('/blogs', (req,res)=> {
//    console.log(req.body);
   const blog = new Blog(req.body);

   blog.save()
    .then((result)=> res.redirect('/blogs'))
    .catch((err)=> console.log(err));
    
})

//get a blog
// app.get('/get-a-blog',(req,res)=>{
//     Blog.findById("621152b87bf7c7a66507bf1d")
//     .then((result) => res.send(result))
//     .catch((err)=> res.send(err))
// });



// Delete a blog
app.delete('/blogs/:id',(req,res)=>{

    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then(result => {
        res.json({redirect: '/blogs'})
    })
    .catch(err => console.log(err))
})

//About Page
app.get('/about', (req,res)=>res.render('about', {title: 'About Us'}));

// Create Blog route
app.get('/blogs/create',(req,res)=>{
    
    res.render('create', {title: 'Create a new Blog Post'});
    
})

//get a blog with _id
app.get('/blogs/:id',(req,res)=>{
    const id = req.params.id;

    Blog.findById(id)
    .then((result)=>{
        res.render('details',{title: 'Blog Details', blog: result})
    })
    .catch((err)=> console.log(err))
})

//404 page - catch all
app.use((req,res) => {
    res.status(400).render('404',{title: '404'});
})