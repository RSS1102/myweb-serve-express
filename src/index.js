const express = require('express')
const cors = require('cors')
const app = express()
const port = 3003
// 跨域设置
// app.all("*",function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
//     next()
// })
app.use(cors())
/**
 * 导入路由
 * 解析req.body
 * 使用同步request请求
 */
const router = require('./router/index')
const bodyParser = require('body-parser')
const direct = require('./directuse/index')
direct.direct()
// var assert = require('assert');
// 这里“bodyParser”中间件一定要配置在路由之前
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/json// for parsing application/x-www-form-urlencoded
app.use(router)
app.stack
// 文件访问路径
// https://www.cnblogs.com/HJ412/p/10912385.html
let path = require('path')
app.use('/files', express.static(path.join(__dirname, 'files')))
// HTTPS 模块开启一个服务
const https = require('https');
const fs = require('fs')
const options = {
    key: fs.readFileSync(__dirname + "/util/ssl/cokbbs.games.key", 'utf8'),
    cert: fs.readFileSync(__dirname + '/util/ssl/cokbbs.games_bundle.crt', 'utf8'),
};



app.get('/', async (req, res) => {
    res.send("express")
})

https.createServer(options, app).listen(port, () => {
    console.log(`Example app listening at https://localhost:${port}`)
    // console.log(`Example app listening at http://0.0.0.0:${port}`)
})