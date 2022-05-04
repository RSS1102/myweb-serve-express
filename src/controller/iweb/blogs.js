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

    // 查询blogContent
    async getBlogContent(req, res) {

        let blogNav = req.body.blogNav
        let blogTitle = req.body.blogTitle
        console.log(blogNav, blogTitle)
        let Content = await Blogs.findAll({
            attributes: ['blogContent'],
            where: {
                blogNav: blogNav,
                blogTitle: blogTitle
            }
        });
        res.send(Content[0])
    },

}