import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/index.js';
import methodOverride from 'method-override';

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        req.method = req.body._method //PUT
        delete req.body._method
        return req.method;
    }
}))

//sample route
//http:localhost:5000
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

// /blogs/about
// /blogs/new_blog
// /blogs/create_blog
app.use('/blogs', routes);

const PORT = 5000;

const CONNECTION_URI = 'mongodb+srv://mongodbclass:mongodb@cluster0.vufqv.mongodb.net/?retryWrites=true&w=majority';

//listener
mongoose.connect(CONNECTION_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`)))
    .catch((error) => console.log(error));