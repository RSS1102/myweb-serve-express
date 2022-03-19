const express = require("express");
const router = express.Router()
    // 引入
const blogs = require('../controller/iweb/blogs')
const githubList = require('../controller/iweb/product')

// blogs
router.get('/api/blogs/getblogmenu', blogs.getBlogMenu)
router.post('/api/blogs/setblogmenu', blogs.setBlogMenu)
router.post('/api/blogs/blogcontent', blogs.getBlogContent)

//getGithubList
router.get('/api/product/getgithublist', githubList.getGithubList)

module.exports = router