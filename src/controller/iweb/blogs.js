const { db } = require('../../sql/iweb/db');
const { QueryTypes } = require('sequelize');
module.exports = {
    async getMenu(req, res) {
        // 查询blogs并格式化数据
        let titles = await db.query("select title from blogs group by title", { type: QueryTypes.SELECT });
        let blogs = []
            // for of不能对象用，for of 可以用来遍历同步
        for (let i of titles) {
            let tit = i.title
            let nav = await db.query(`select content,text from blogs where title="${i.title}"`, { type: QueryTypes.SELECT });
            // [tit] 属性名用[]包起来才能用变量
            let obj = {
                title: tit,
                nav: nav
            }
            blogs.push(obj)
        }
        // console.log('%j', blogs)
        res.send(blogs)
    },

    async setMenu(req, res) {
        let body = req.body
        console.log(body)
        const { Blogs } = require('../../sql/iweb/blogs');
        await Blogs.create(body)
            .then(date => {
                console.log(date)
                res.send(date.dataValues)
            }).catch(err => {
                console.log(err)
            })
    }
}