const express = require("express");
const router = express.Router()
    // 引入
const iBlogs = require('../controller/iweb/blogs')
const cBlogs = require('../controller/cweb/blogs')
const githubList = require('../controller/iweb/product')

//*********i********* */
// blogs
router.get('/api/blogs/getblogmenu', iBlogs.getBlogMenu)
router.post('/api/blogs/blogcontent', iBlogs.getBlogContent)



//getGithubList
router.get('/api/product/getgithublist', githubList.getGithubList)


// **********c**************/
// blogs
router.post('/api/blogs/setblognav', cBlogs.setBlogNav)
router.post('/api/blogs/getblognav', cBlogs.getBlogNav)
router.post('/api/blogs/setblogmenu', cBlogs.setBlogMenu)

module.exports = router