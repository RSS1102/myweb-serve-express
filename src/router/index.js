const express = require("express");
const router = express.Router()
    // 引入
const iBlogs = require('../controller/iweb/blogs')
const cBlogsNav = require('../controller/cweb/blogsnav')
const githubList = require('../controller/iweb/product')
const cBlogs = require('../controller/cweb/blogs')
    //************************i******************************/
    // blogs
router.get('/api/blogs/getblogmenu', iBlogs.getBlogMenu)
router.post('/api/blogs/blogcontent', iBlogs.getBlogContent)

//getGithubList
router.get('/api/product/getgithublist', githubList.getGithubList)

// ******************************cweb************************/
// blogs
router.get('/cweb/cBlogsNav/getBlogNav', cBlogsNav.getBlogNav)
router.post('/cweb/cBlogsNav/addBlogNav', cBlogsNav.addBlogNav)
router.post('/cweb/cBlogsNav/delBlogNav', cBlogsNav.delBlogNav)
router.post('/cweb/cBlogsNav/upBlogMenu', cBlogsNav.upBlogMenu)
router.post('/cweb/cBlogs/getBlogsPaging', cBlogs.getBlogsPaging)

module.exports = router