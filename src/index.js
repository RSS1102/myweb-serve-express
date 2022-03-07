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
const direct = require('./router/directrouter')
direct.direct()

app.use(router)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/json// for parsing application/x-www-form-urlencoded

// test
app.get('/', async(req, res) => {

    res.send('进入后端......')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})