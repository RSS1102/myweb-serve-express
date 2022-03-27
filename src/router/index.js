const express = require("express");
const router = express.Router()
    // 引入
const iBlogs = require('../controller/iweb/blogs')
const cBlogs = require('../controller/cweb/blogs')
const githubList = require('../controller/iweb/product')

//************************i******************************/
// blogs
router.get('/api/blogs/getblogmenu', iBlogs.getBlogMenu)
router.post('/api/blogs/blogcontent', iBlogs.getBlogContent)

//getGithubList
router.get('/api/product/getgithublist', githubList.getGithubList)

// ******************************cweb************************/
// blogs
router.get('/cweb/blogs/getblognav', cBlogs.getBlogNav)
router.post('/cweb/blogs/addblogNav', cBlogs.addBlogNav)
router.post('/cweb/blogs/delblognav', cBlogs.delBlogNav)
router.post('/cweb/blogs/upblogmenu', cBlogs.upBlogMenu)

module.exports = router