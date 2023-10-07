import Model from '../models/index.js';
import moment from 'moment';

//blogs function
//name export
export const blogs =  async (req, res) => {
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
}