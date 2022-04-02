const { db } = require('../../sql/db/db');
const { QueryTypes } = require('sequelize');
const { Blogs } = require('../../sql/iweb/blogs');
const qs = require('qs')
module.exports = {
    async getBlogMenu(req, res) {
        // 查询blogs并格式化数据
        let titles = await db.query("select title from blogs group by title", { type: QueryTypes.SELECT });
        let blogs = []
            // for of不能对象用，for of 可以用来遍历同步
        for (let i of titles) {
            let tit = i.title
            let nav = await db.query(`select navindex from blogs where title="${i.title}"`, { type: QueryTypes.SELECT });
            let navs = []
            for (let i of nav) {
                navs.push(i.navindex)
            }
            // [tit] 属性名用[]包起来才能用变量
            let obj = {
                    title: tit,
                    navs: qs.stringify({ navs: navs }, { arrayFormat: 'indices' })
                }
                // let a = qs.stringify({ navs: navs }, { arrayFormat: 'indices' })
                // console.log(qs.parse(a))
            blogs.push(obj)
        }
        res.send(blogs)
    },


    async getBlogContent(req, res) {
        // 查询blogs并格式化数据
        const navindex = req.body.navindex
        const title = req.body.title
        console.log(navindex, title)
        let Content = await Blogs.findAll({
            attributes: ['content'],
            where: {
                navindex: navindex,
                title: title
            }
        });
        res.send(Content)
    },

}