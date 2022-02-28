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
const getWarehouseCommit = (wareName) => {
    //获取所有的库 https://api.github.com/users/{username}/repos
    let options = {
            method: 'GET',
            port: 443, //https的默认port：443
            hostname: 'api.github.com', //这里不需要用https：//
            path: `/repos/RSS1102/${wareName}/commits?per_page=1`,
            //用来验证用户姓名和token ：https://blog.csdn.net/zhuming3834/article/details/7764996
            //
            headers: {
                'User-Agent': 'RSS1102',
                'Authorization': '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',
            }
        }
        // 这里不能用request,用get
    https.get(options, _res => {
        let body = [];
        _res.on('data', data => body += data); //JSON.parse(body)
        _res.on('end', () => {
            console.log("body", JSON.parse(body))

            let updateObj = {
                message: JSON.parse(body)[0].commit.message,
                author_name: JSON.parse(body)[0].commit.author.name,
                committer_avatar_url: JSON.parse(body)[0].committer.avatar_url,
                committer_html_url: JSON.parse(body)[0].committer.html_url,
                author_date: JSON.parse(body)[0].commit.committer.date,
            }
            console.log(updateObj)
        })
        _res.on('error', err => {
            console.log("err", err)
        })
    })
}
wareName = 'myweb-serve-express'
getWarehouseCommit(wareName)
    // console.log(getWarehouseCommit())
    // 处理数据1
let { userku } = require('../json/git')
let myWarehouse = []
for (let i = 0; i < userku.length; i++) {
    let wareName = userku[i].name
        // getWarehouseCommit(wareName)
    let data = {
        name: userku[i].name,
        description: userku[i].description,
        url: userku[i].url,
        fork: userku[i].fork,
        forks_url: userku[i].forks_url,
        topics: userku[i].topics,
        language: userku[i].language,

        stargazers_count: userku[i].stargazers_count,
    }
    myWarehouse.push(data)

    // Object.assign

}
// console.log(myWarehouse)