const express = require('express')
const app = express()
const port = 3000

const router = require('./router/index')
const bodyParser = require('body-parser')


/**
 * 导入路由
 * 解析req.body
 */
app.use(router)
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// test
app.get('/', async(req, res) => {
    res.send('进入后端......')
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})