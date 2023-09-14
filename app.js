//set up a express app
const express = require('express');
const mongoose = require('mongoose');

const app = express();

//set up a view a view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(
    express.urlencoded({ extended: true })
);

//set up a single route
// http://localhost:5000/
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

// http://localhost:5000/blogs
app.get('/blogs', (req, res) => {
    res.render('blogs.ejs');
});

// http://localhost:5000/about
app.get('/about', (req, res) => {
    res.render('about.ejs');
});

//model
const Schema = new mongoose.Schema({
    blog_title: String,
    blog_snippet: String,
    blog_body: String,
    created_At: {
        default: Date.now(),
        type: Date
    }
});

const Model = mongoose.model('blogs', Schema);

// http://localhost:5000/new_blog
app.get('/new_blog', (req, res) => {
    let error = '';

    if (req.query.error) {
        error = req.query.error; //true
    }

    res.render('new_blog.ejs', { error });
});
app.post('/create/blog', async (req, res) => {
    try {
        console.log(req.body);
        if (req.body.blog_title === '' || req.body.blog_snippet === '' || req.body.blog_body === '') {
            res.redirect(`/new_blog?error=${true}`);
        }

        //save the data to the database
        const blog = await Model.create(
            {
                blog_title: req.body.blog_title,
                blog_snippet: req.body.blog_snippet,
                blog_body: req.body.blog_body
            }
        );

        console.log(blog);

        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }
});

//create a listener
const PORT = 5000;

const CONNECTION_URI = 'mongodb+srv://blog:blog@cluster0.kyxpvui.mongodb.net/?retryWrites=true&w=majority';

//mongodb connection here
mongoose.connect(CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`)))
    .catch((error) => console.log(error));