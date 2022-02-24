const { sequelize } = require('../sql/db');
module.exports = {
    menu(req, res) {
        const onclick = async() => {
            const { QueryTypes } = require('sequelize');
            // 查询blogs并格式化数据
            let titles = await sequelize.query("select title from blogs group by title", { type: QueryTypes.SELECT });
            let blogs = []
                // for of不能对象用，for of 可以用来遍历同步
            for (let i of titles) {
                let tit = i.title
                let nav = await sequelize.query(`select content,text from blogs where title="${i.title}"`, { type: QueryTypes.SELECT });
                // [tit] 属性名用[]包起来才能用变量
                let obj = {
                    [tit]: nav
                }
                blogs.push(obj)
            }
            // console.log('%j', blogs)
            res.send(blogs)
                // 方案二(格式化数据)
                // let blogs = await sequelize.query("select * from blogs", { type: QueryTypes.SELECT });
                // let data2 = Object.entries(blogs.reduce((o, v) =>
                //         (Reflect.has(o, v.title) ?
                //             Reflect.get(o, v.title).push(v) :
                //             Reflect.set(o, v.title, []), Reflect.deleteProperty(v, 'title'), o), {}))
                //     .map(v => ({ title: v[0], SecondNavBar: v[1] }))
                // console.log("blogs", data2)
        }
        onclick()

    }
}