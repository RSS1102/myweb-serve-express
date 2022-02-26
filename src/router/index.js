const express = require("express");
const router = express.Router()
    // 引入
const blogs = require('../controller/blogs')

// blogs
router.get('/api/blogs/getmenu', blogs.getMenu)
router.post('/api/blogs/setmenu', blogs.setMenu)

module.exports = router