const express = require("express");
const router = express.Router()
const multer = require('multer')
// 文件上传
const storage = multer.diskStorage({
    // 必须是已存在的路径'files'
    destination: function (req, file, cb) {
        cb(null, 'src/files')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })
// 引入
const iBlogs = require('../controller/iweb/blogs')
const cBlogsNav = require('../controller/cweb/blogsnav')
const githubList = require('../controller/iweb/product')
const cBlogs = require('../controller/cweb/blogs')
//************************iweb******************************/
// blogs
router.get('/api/blogs/getblogmenu', iBlogs.getBlogMenu)
router.post('/api/blogs/blogcontent', iBlogs.getBlogContent)

//getGithubList
router.get('/api/product/getgithublist', githubList.getGithubList)

// ******************************cweb************************/
// blogsnav
router.get('/cweb/blogsNav/getBlogsNav', cBlogsNav.getBlogsNav)
router.post('/cweb/blogsNav/addBlogsNav', cBlogsNav.addBlogsNav)
router.post('/cweb/blogsNav/delBlogsNav', cBlogsNav.delBlogsNav)
router.post('/cweb/blogsNav/editBlogsNav', cBlogsNav.editBlogsNav)
// blogs
router.post('/cweb/cBlogs/saveBlogs', cBlogs.saveBlogs)
router.post('/cweb/cBlogs/getBlogs', cBlogs.getBlogs)
router.post('/cweb/cBlogs/upLoadFile', upload.single('file'), cBlogs.upLoadFile)
// router.get('/cweb/cBlogs/getImgFiles', cBlogs.getImgFiles)

module.exports = router