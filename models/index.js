import mongoose from "mongoose";

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

//module.exports = Model;
export default Model;