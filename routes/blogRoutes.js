const express = require('express');
const { blog_index, blog_details, blog_create_get, blog_create_post, blog_delete } = require('../controller/blogController');
//const blogController = require('../controller/blogController')
const router = express.Router();

router.get('/blogs', blog_index);
//router.get('/blogs', blogController.blog_index);

router.post('/blogs', blog_details);

router.get('/blogs/create', blog_create_get);

router.get('/blogs/:id', blog_create_post);

router.delete('/blogs/:id', blog_delete);

module.exports = router