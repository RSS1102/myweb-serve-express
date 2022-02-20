const express = require("express");
const router = express.Router()
    // 引入
const blogs = require('../controller/blogs')

router.get('/api/blogs/menu', blogs.menu)

module.exports = router