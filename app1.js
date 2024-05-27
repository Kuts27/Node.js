const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')

//create express app
const app = express();

//connect to mongoDB
const dbURI = 'mongodb+srv://Sachin:test123@nodeblogs.dvfvfmu.mongodb.net/?retryWrites=true&w=majority&appName=NodeBlogs'
mongoose.connect(dbURI)
.then((result) => app.listen(3000))
.catch((err) => console.log(err))

//register view engine
app.set('view engine','ejs');

app.use(morgan('dev'));
//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

app.get('/', (req,res) =>{
    res.redirect('/blogs');
});

app.get('/about', (req,res) =>{
    //res.send('<p>Homepage</p>')
    res.render('about', { title:'About'});
});

app.use(blogRoutes);

//redirect
app.get('/about-us', (req,res) =>{
    res.redirect('/about', { title:'About'});
})

//404 
app.use((req,res) => {
    res.status(404).render('404', { title:'Not Found'});
})


