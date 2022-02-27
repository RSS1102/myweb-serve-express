const express = require("express");
const router = express.Router()
    // 引入
const blogs = require('../controller/iweb/blogs')
const githubList = require('../controller/iweb/product')
    // blogs
router.get('/api/blogs/getmenu', blogs.getMenu)
router.post('/api/blogs/setmenu', blogs.setMenu)
    //getGithubList
router.get('/api/blogs/getgithublist', githubList.getGithubList)

module.exports = router