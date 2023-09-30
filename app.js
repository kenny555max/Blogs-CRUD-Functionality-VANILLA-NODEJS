const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

//sample route
//http:localhost:5000
app.get('/', (req, res) => {
    res.redirect('/blogs');
});


//schema
const Schema = new mongoose.Schema({
    blog_title: String,
    blog_snippet: String,
    blog_body: String,
    blog_created_at: {
        type: Date,
        default: Date.now //current date
    }
});

//model
const Model = mongoose.model('Blogs', Schema);

// http:localhost:5000/blogs
app.get('/blogs', async (req, res) => {
    try {
        const blogs = await Model.find();

        //console.log(blogs);
        //Map - hihger order array method/function - which returns a new array
        const all_blogs = blogs.map(function (blog) {
            return {
                blog_id: blog._id,
                blog_title: blog.blog_title,
                blog_snippet: blog.blog_snippet,
                blog_body: blog.blog_body,
                blog_created_at: moment(blog.blog_created_at).calendar() // Today at 11:55
            }
        });

        res.render('blogs', { blogs: all_blogs });
    } catch (error) {
        console.log(error);
    }
});

//http:localhost:5000/blogs/about - render the about.ejs
// GET, POST, DELETE, PUT
app.get('/blogs/about', (req, res) => {
    res.render('about');
});

//http:localhost:5000/blogs/new_blog - render the new_blog.
app.get('/blogs/new_blog', (req, res) => {
    console.log(req.query);

    res.render('new_blog');
});

//http://localhost:5000/blogs/create_blog
app.post('/blogs/create_blog', async (req, res) => {
    try {
        const blog = await Model.create(req.body);

        console.log(blog);

        res.redirect('/blogs');
    } catch (error) {
        console.log(error);
    }
});

app.get('/blogs/edit/:id', (req, res) => {
    res.redirect(`/blogs/new_blog?blog_id=${req.params.id}`);
});

const PORT = 5000;

const CONNECTION_URI = 'mongodb+srv://mongodbclass:mongodb@cluster0.vufqv.mongodb.net/?retryWrites=true&w=majority';

//listener
mongoose.connect(CONNECTION_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`)))
    .catch((error) => console.log(error));