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
let updateObj = {}
const getWarehouseCommit = async(wareName) => {
    //获取所有的库 https://api.github.com/users/{username}/repos
    let options = {
        method: 'GET',
        port: 443,
        hostname: 'api.github.com',
        path: `/repos/RSS1102/${wareName}/commits?per_page=1`,
        headers: {
            'User-Agent': 'RSS1102',
            'Authorization': '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',
        }
    }
    https.get(options, _res => {
        let body = [];
        _res.on('data', data => body += data); //JSON.parse(body)
        _res.on('end', () => {
            updateObj = {
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
    // getWarehouseCommit(wareName)



// 处理数据1
let { userku } = require('../json/git')
    // let userWarehouse = []
    // for (let i = 0; i < userku.length; i++) {
    //     let wareName = userku[i].name
    //         // getWarehouseCommit(wareName)
    //     let data = {
    //         name: userku[i].name,
    //         description: userku[i].description,
    //         url: userku[i].url,
    //         fork: userku[i].fork,
    //         forks_url: userku[i].forks_url,
    //         topics: userku[i].topics,
    //         language: userku[i].language,

//         stargazers_count: userku[i].stargazers_count,
//     }
//     userWarehouse.push(data)

//     // Object.assign

// }
// console.log(myWarehouse)


let usersOptions = {
    method: 'GET',
    port: 443,
    hostname: 'api.github.com',
    path: '/users/RSS1102/repos',
    headers: {
        'User-Agent': 'RSS1102',
        'Authorization': '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',
    }
}
https.get(usersOptions, _res => {
    let body = '';
    _res.on('data', data => body += data);
    _res.on('end', () => {
        // 进行数据处理
        let userWarehouse = []
        for (let i = 0; i < userku.length; i++) {
            let wareName = userku[i].name
            let userData = {
                    name: userku[i].name,
                    description: userku[i].description,
                    url: userku[i].url,
                    fork: userku[i].fork,
                    forks_url: userku[i].forks_url,
                    topics: userku[i].topics,
                    language: userku[i].language,
                    stargazers_count: userku[i].stargazers_count,
                }
                // 分开查询每个库的提交信息
            let options = {
                method: 'GET',
                port: 443,
                hostname: 'api.github.com',
                path: `/repos/RSS1102/${wareName}/commits?per_page=1`,
                headers: {
                    'User-Agent': 'RSS1102',
                    'Authorization': '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',
                }
            }
            https.get(options, _res => {
                let body = [];
                _res.on('data', data => body += data); //JSON.parse(body)
                _res.on('end', () => {
                    console.log("body______", body)
                        // 判断authors与committer是否存在   
                    let authors = ''
                    JSON.parse(body)[0].author ? authors = JSON.parse(body)[0].author : JSON.parse(body)[0].committer ? authors = JSON.parse(body)[0].committer : ''
                    updateObj = {
                        committer_message: JSON.parse(body)[0].commit.message,
                        committer_name: JSON.parse(body)[0].commit.author.name,
                        committer_avatar: authors,
                        committer_html: authors,
                        committer_date: JSON.parse(body)[0].commit.committer.date,
                    }
                    let objs = Object.assign(userData, updateObj)
                    console.log("objs", objs)
                    userWarehouse.push(objs)
                })
                _res.on('error', err => {
                    console.log("err", err)
                })
            })

        }
        console.log("userWarehouse", userWarehouse)


    })
    _res.on('error', err => {
        console.log("err", err)
    })
})