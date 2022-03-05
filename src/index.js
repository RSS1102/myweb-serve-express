const express = require('express')
const app = express()
const port = 3000
    /**
     * 导入路由
     * 解析req.body
     * 使用同步request请求
     */
const router = require('./router/index')
const bodyParser = require('body-parser')
const reqs = require('request-promise');



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
const doit = async() => {
    const { Authorization } = require('../util/git')
    let usersOptions = {
        uri: 'https://api.github.com/users/RSS1102/repos',
        method: 'GET',
        port: 443,
        headers: {
            'User-Agent': 'RSS1102',
            'Authorization': Authorization,
        }
    }


    let userku = []
    let userWarehouse = []
    let warehouseJson = []
    await reqs(usersOptions)
        .then(res => {
            userku = JSON.parse(res)

        })
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
            // 个人信息
        userWarehouse.push(userData)
        let wareOptions = {
            method: 'GET',
            port: 443,
            uri: `https://api.github.com/repos/RSS1102/${wareName}/commits?per_page=1`,
            headers: {
                'User-Agent': 'RSS1102',
                'Authorization': Authorization,
            }
        }
        await reqs(wareOptions)
            .then(body => {
                // 判断authors与committer是否存在   
                let comAuthors = {}
                JSON.parse(body)[0].author ? comAuthors = JSON.parse(body)[0].author : JSON.parse(body)[0].committer ? comAuthors = JSON.parse(body)[0].committer : ''
                let updateObj = {
                    "commit": [
                        { committer_message: JSON.parse(body)[0].commit.message },
                        { committer_name: JSON.parse(body)[0].commit.author.name },
                        { committer_avatar: comAuthors.avatar_url },
                        { committer_html: comAuthors.html_url },
                        { committer_date: JSON.parse(body)[0].commit.committer.date },
                    ]
                }
                let objs = Object.assign(userData, updateObj)
                    // 库信息
                warehouseJson.push(objs)

            })
    }
    console.log("warehouseJson-------------------------------------------------", JSON.stringify(warehouseJson))
}
doit()