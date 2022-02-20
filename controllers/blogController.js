// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const Blog =  require('../models/blog');

// Get all the blogs
blog_index = (req,res) =>{

    Blog.find().sort({createdAt: -1})
    .then((result)=> res.render('blogs/index', {title : 'All Blogs', blogs: result}))
    .catch((err)=> console.log(err))
}

// Get blog create page
blog_create_get = (req,res) => {
    res.render('blogs/create', {title: 'Create a new Blog Post'});
}

// Post new blog
blog_create_post = (req,res) => {
    const blog = new Blog(req.body);

    blog.save()
    .then((result)=> res.redirect('/blogs'))
    .catch((err)=> console.log(err));
}


// Get a blog details
blog_details = (req,res) =>{
    const id = req.params.id;

    Blog.findById(id)
    .then((result)=>{
        res.render('blogs/details',{title: 'Blog Details', blog: result})
    })
    .catch((err)=> console.log(err))
}


blog_delete = (req,res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then(result => {
        res.json({redirect: '/blogs'})
    })
    .catch(err => console.log(err))
}


module.exports ={
    blog_index,
    blog_create_get,
    blog_create_post,
    blog_details,
    blog_delete
}