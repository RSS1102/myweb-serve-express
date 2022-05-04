const { db } = require('../../sql/db/db');
const { QueryTypes } = require('sequelize');
const { Blogs } = require('../../sql/iweb/blogs');
const { BlogNavs } = require('../../sql/cweb/blognavs');
const qs = require('qs')
module.exports = {
    async getBlogMenu(req, res) {
        const BlogMenu = await Blogs.findAll({
            attributes: ['blogNav', 'blogTitle'],
        });
        const BlogMenuList = Object.create(null);
        BlogMenu.forEach(({
            blogNav,
            blogTitle
        }) => {
            if (BlogMenuList[blogNav]) {
                BlogMenuList[blogNav].push(blogTitle)
            } else {
                BlogMenuList[blogNav] = [blogTitle]
            }
        })
        res.send(BlogMenuList)
    },


    async getBlogContent(req, res) {
        // 查询blogs并格式化数据
        const blogNav = req.body.blogNav
        const title = req.body.title
        console.log(blogNav, title)
        let Content = await Blogs.findAll({
            attributes: ['content'],
            where: {
                blogNav: blogNav,
                title: title
            }
        });
        res.send(Content)
    },

}