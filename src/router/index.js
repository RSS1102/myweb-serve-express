const express = require("express");
const router = express.Router()
const multer = require('multer')
const storage = multer.diskStorage({
    // 必须是已存在的路径'files'
    destination: function(req, file, cb) {
        cb(null, 'files')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })
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
// blogsnav
router.get('/cweb/cBlogsNav/getBlogNav', cBlogsNav.getBlogNav)
router.post('/cweb/cBlogsNav/addBlogNav', cBlogsNav.addBlogNav)
router.post('/cweb/cBlogsNav/delBlogNav', cBlogsNav.delBlogNav)
router.post('/cweb/cBlogsNav/upBlogMenu', cBlogsNav.upBlogMenu)
    // blogs
router.post('/cweb/cBlogs/getBlogsPaging', cBlogs.getBlogsPaging)
router.post('/cweb/cBlogs/upLoadFile', upload.single('file'), cBlogs.upLoadFile)

module.exports = router