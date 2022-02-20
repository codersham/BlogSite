const express = require('express');

const Blog =  require('../models/blog');

const blogRoute = express.Router();

//get all blogs
blogRoute.get('/',(req,res)=> {
    Blog.find().sort({createdAt: -1})
    .then((result)=> res.render('index', {title : 'All Blogs', blogs: result}))
    .catch((err)=> console.log(err))
});


// Create Blog route
blogRoute.get('/create',(req,res)=>{
    
    res.render('create', {title: 'Create a new Blog Post'});
    
})

// Create a new blog POST
blogRoute.post('/', (req,res)=> {

    const blog = new Blog(req.body);

   blog.save()
    .then((result)=> res.redirect('/blogs'))
    .catch((err)=> console.log(err));
    
})


//get a blog with _id
blogRoute.get('/:id',(req,res)=>{
    const id = req.params.id;

    Blog.findById(id)
    .then((result)=>{
        res.render('details',{title: 'Blog Details', blog: result})
    })
    .catch((err)=> console.log(err))
})


// Delete a blog
blogRoute.delete('/:id',(req,res)=>{

    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then(result => {
        res.json({redirect: '/blogs'})
    })
    .catch(err => console.log(err))
})

module.exports = blogRoute;