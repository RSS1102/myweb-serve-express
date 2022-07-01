const express = require("express");
const router = express.Router()
// 引入
const iBlogs = require('../controller/iweb/blogs')
const cProduct = require('../controller/iweb/product')
const cBlogsNav = require('../controller/cweb/blogsnav')
const cBlogs = require('../controller/cweb/blogs')
const cOperationLogs = require('../controller/cweb/operationlogs')
//************************iweb******************************/
// blogs
router.get('/api/blogs/getblogmenu', iBlogs.getBlogMenu)
router.post('/api/blogs/blogcontent', iBlogs.getBlogContent)
//getGithubList
router.get('/api/product/getgithublist', cProduct.getGithubList)
// ******************************cweb************************/
// blogsnav
router.get('/cweb/blogsNav/getBlogsNav', cBlogsNav.getBlogsNav)
router.post('/cweb/blogsNav/addBlogsNav', cBlogsNav.addBlogsNav)
router.post('/cweb/blogsNav/delBlogsNav', cBlogsNav.delBlogsNav)
router.post('/cweb/blogsNav/editBlogsNav', cBlogsNav.editBlogsNav)
// blogs
router.post('/cweb/cBlogs/saveBlogs', cBlogs.saveBlogs)
router.post('/cweb/cBlogs/getBlogs', cBlogs.getBlogs)
router.post('/cweb/cblogs/changeArticleShow', cBlogs.changeArticleShow)
//action
router.get('/cweb/cblogs/getOperationLogs', cOperationLogs.getActionDone)
// 上传图片
// 当使用 Error handling的时候不应该在此处再次声明 uploadImage.single('file'),
router.post('/cweb/cBlogs/upLoadFile', cBlogs.upLoadFile)
// router.get('/cweb/cBlogs/getImgFiles', cBlogs.getImgFiles)

module.exports = router