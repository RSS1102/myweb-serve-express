const express = require('express')
const app = express()
const port = 3000

const router = require('./router/index')
    /**
     * 导入路由
     */
app.use(router)

// app.use(express.json())

const sql = require('mssql')
const sqlConfig = {
    user: "root",
    password: "root",
    database: "web",
    server: 'localhost:3306',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
        trustServerCertificate: false // change to true for local dev / self-signed certs
    }
}
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('web', 'root', 'root', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql'
});
const onclick = async() => {
    const { QueryTypes } = require('sequelize');
    let blogs = await sequelize.query("SELECT * FROM `blogs`", { type: QueryTypes.SELECT });

    console.log("blogs", blogs)
}
onclick()



app.get('/', async(req, res) => {
    res.send('进入后端......')

})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})