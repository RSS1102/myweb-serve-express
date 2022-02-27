const express = require('express')
const app = express()
const port = 3000

const router = require('./router/index')
const bodyParser = require('body-parser')
const https = require("https");

/**
 * 导入路由
 * 解析req.body
 */
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
const test = () => {
        //获取所有的库 https://api.github.com/users/{username}/repos
        let options = {
                method: 'GET',
                port: 443, //https的默认port：443
                hostname: 'api.github.com', //这里不需要用https：//
                path: '/users/RSS1102/repos',
                headers: {
                    'User-Agent': 'RSS1102'
                } //用来验证用户见：https://blog.csdn.net/zhuming3834/article/details/77649960
            }
            // 这里不能用request,用get
        https.get(options, _res => {
            let body = '';
            _res.on('data', data => body += data);
            _res.on('end', () => {
                console.log(body)
            })
            _res.on('error', err => {
                console.log("err", err)
            })

        })


    }
    // test()
    // 处理数据1
let { userku } = require('../json/git')
let myWarehouse = []
for (let i = 0; i < userku.length; i++) {
    let data = {
        name: userku[i].name,
        description: userku[i].description,
        url: userku[i].url,
        fork: userku[i].fork,
        forks_url: userku[i].forks_url,
        topics: userku[i].topics,
        language: userku[i].language,
        pushed_at: userku[i].pushed_at,
    }
    myWarehouse.push(data)

}
console.log(myWarehouse)