const express = require('express');

const {} = require('../controllers/blogController');

const blogRoute = express.Router();

//get all blogs
blogRoute.get('/',blog_index);


// Create Blog route
blogRoute.get('/create', blog_create_get);


// Create a new blog POST
blogRoute.post('/', blog_create_post);


//get a blog with _id
blogRoute.get('/:id', blog_details);


// Delete a blog
blogRoute.delete('/:id', blog_delete);

module.exports = blogRoute;