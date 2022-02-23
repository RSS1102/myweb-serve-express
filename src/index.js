const express = require('express')
const app = express()
const port = 3000

const router = require('./router/index')
    /**
     * 导入路由
     */
app.use(router)

// app.use(express.json())


const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('web', 'root', 'root', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql'
});
const onclick = async() => {
    const { QueryTypes } = require('sequelize');
    // 查询blogs并格式化数据
    let blogs = await sequelize.query("SELECT * FROM `blogs`", { type: QueryTypes.SELECT });
    let data2 = Object.entries(blogs.reduce((o, v) =>
            (Reflect.has(o, v.title) ?
                Reflect.get(o, v.title).push(v) :
                Reflect.set(o, v.title, []), Reflect.deleteProperty(v, 'title'), o), {}))
        .map(v => ({ title: v[0], SecondNavBar: v[1] }))
    console.log("blogs", data2)
}
onclick()



app.get('/', async(req, res) => {
    res.send('进入后端......')

})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})