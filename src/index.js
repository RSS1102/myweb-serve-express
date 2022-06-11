const express = require('express')
const app = express()
const port = 3003
/**
 * 导入路由
 * 解析req.body
 * 使用同步request请求
 */
const router = require('./router/index')
const bodyParser = require('body-parser')
const direct = require('./directuse/directrouter')
direct.direct()
// var assert = require('assert');
// 这里“bodyParser”中间件一定要配置在路由之前
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/json// for parsing application/x-www-form-urlencoded
app.use(router)
app.stack
// test
let path = require('path')
// 文件访问路径
// https://www.cnblogs.com/HJ412/p/10912385.html
app.use('/files', express.static(path.join(__dirname, 'files')))

app.get('/', async (req, res) => {
    res.send("express")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    // console.log(`Example app listening at http://0.0.0.0:${port}`)
})