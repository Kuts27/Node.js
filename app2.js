const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');


//create express app
const app = express();

//connect to mongoDB
const dbURI = 'mongodb+srv://Sachin:test123@nodeblogs.dvfvfmu.mongodb.net/?retryWrites=true&w=majority&appName=NodeBlogs'
mongoose.connect(dbURI)
.then((result) => app.listen(3000))
.catch((err) => console.log(err))

//register view engine
app.set('view engine','ejs');

// listen for request
//app.listen(3000);

app.use(morgan('dev'));
//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

//mongoose and mongo sandbox routes
app.get('/add-blog', (req,res) =>{
    const blog = new Blog({
        title: 'New Blog 2',
        snippet: 'About my new blog',
        body: 'More About my blog'
    });

    blog.save()
      .then((result)=>{
        res.send(result)
      })
      .catch((err) => {
        console.log(err)
      });
})

app.post('/blogs', (req,res) => {
    const blog = new Blog(req.body);
    blog.save()
      .then((result) => {
            res.redirect('/blogs');
      })
      .catch((err) => {
            console.log(err);
      } )
})
// app.use((req,res,next) => {
//     console.log('new request made')
//     console.log('host:', req.hostname)
//     console.log('path:', req.path)
//     console.log('method:',req.method)
//     next();
// })

app.get('/', (req,res) =>{
    //res.send('<p>Homepage</p>')

    // const blogs = [
    //     {title: 'Sachins blog', snippet: 'lorem1  csmc bsdisb skncsk'},
    //     {title: `Rohan's blog`, snippet: 'lorem1  csmc bsdisb skncsk'},
    //     {title: 'Jagdish blog', snippet: 'lorem1  csmc bsdisb skncsk'}
    // ]
    // res.render('index', { title:'Home', blogs });

    res.redirect('/blogs');
});

app.get('/about', (req,res) =>{
    //res.send('<p>Homepage</p>')
    res.render('about', { title:'About'});
});

app.get('/blogs', (req,res)=>{
    Blog.find().sort({createdAt: -1})
      .then((result) => {
            res.render('index', {title: 'All Blogs', blogs:result})

      })
      .catch((err) =>{
            console.log(err)
      })
})

app.get('/blogs/create', (req,res) =>{
    res.render('create', {title:'New Blog'});
})

app.get('/blogs/:id', (req,res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('details', {blog: result, title:'Blog Details'})
        })
        .catch((err) => {
            console.log(err)
        })
})


//redirect
app.get('/about-us', (req,res) =>{
    res.redirect('/about', { title:'About'});
})

app.delete('/blogs/:id', (req,res) => {
    const id =req.params.id

    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({redirect:'/blogs'})
      })
      .catch( err =>{
        console.log(err)
      })
})

//404 
app.use((req,res) => {
    res.status(404).render('404', { title:'Not Found'});
})


