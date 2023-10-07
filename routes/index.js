import express from 'express';
import Model from '../models/index.js';

const routes = express.Router();
import { blogs } from '../controller/index.js';

// http:localhost:5000/blogs
routes.get('/', blogs);

//http:localhost:5000/blogs/about - render the about.ejs
// GET, POST, DELETE, PUT
routes.get('/about', (req, res) => {
    res.render('about');
});

//http:localhost:5000/blogs/new_blog - render the new_blog.
routes.get('/new_blog', async (req, res) => {
    let blog = null;
    
    //if the blog_id/id exist, that means the user wants to edit
    if (req.query.blog_id) {
        //using the id, edit the data
        blog = await Model.findById(req.query.blog_id);
    } else {
        blog = {
            blog_title: '',
            blog_snippet: '',
            blog_body: '',
        }
    }

    res.render('new_blog', { blog });
});

//http://localhost:5000/blogs/create_blog
routes.post('/create_blog', async (req, res) => {
    try {
        const blog = await Model.create(req.body);

        console.log(blog);

        res.redirect('/blogs');
    } catch (error) {
        console.log(error);
    }
});

routes.put('/edit_blog', async (req, res) => {
    try {
        const blog = await Model.findByIdAndUpdate(req.body.blog_id, {
            ...req.body, _id: req.body.blog_id, blog_created_at: Date.now()
        }, { new: true });

        console.log(blog);

        res.redirect('/blogs');
    } catch (error) {
        console.log(error);
    }
});

routes.delete('/delete_blog', async (req, res) => {
    try {
        await Model.findByIdAndDelete(req.body.blog_id);

        res.redirect('/blogs');
    } catch (error) {
        console.log(error);
    }
});

export default routes;