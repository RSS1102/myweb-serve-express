const reqs = require('request-promise');
const { Authorization } = require('../../../util/config')
const { wareHouse } = require('../../sql/iweb/product');
module.exports = {
    async getware() {
        // 数据库
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
            // 个人信息
        await reqs(usersOptions)
            .then(res => {
                userku = JSON.parse(res)
            })
        for (let i = 0; i < userku.length; i++) {
            let wareName = userku[i].name
            let languageOptions = {
                uri: `https://api.github.com/repos/RSS1102/${wareName}/languages`,
                method: 'GET',
                port: 443,
                headers: {
                    'User-Agent': 'RSS1102',
                    'Authorization': Authorization,
                }
            }
            let commitOptions = {
                    uri: `https://api.github.com/repos/RSS1102/${wareName}/commits?per_page=1`,
                    method: 'GET',
                    port: 443,
                    headers: {
                        'User-Agent': 'RSS1102',
                        'Authorization': Authorization,
                    }
                }
                // 2，获取使用的语言
            let usersLanguage = {}
            await reqs(languageOptions)
                .then(res => {
                    usersLanguage = JSON.parse(res)
                })

            // 3，获取commit信息
            let usersCommit = {}
            await reqs(commitOptions)
                .then(res => {
                    usersCommit = JSON.parse(res)[0]
                        // 判断authors与committer是否存在   
                    let commitAothor = {}
                    usersCommit.author ? commitAothor = usersCommit.author : (usersCommit.committer ? commitAothor = usersCommit.committer : '')
                    usersCommit = {
                        commit_message: usersCommit.commit.message,
                        commit_name: usersCommit.commit.author.name,
                        commit_avatar: commitAothor.avatar_url,
                        commit_html: commitAothor.html_url,
                        commit_date: usersCommit.commit.committer.date,
                    }
                })

            let userWarehouse = {
                name: userku[i].name,
                description: userku[i].description,
                url: userku[i].url,
                homepage: userku[i].homepage,
                stargazers_count: userku[i].stargazers_count,
                fork: userku[i].fork,
                ware_languages: usersLanguage,
                ware_commits: usersCommit,
                ware_topics: Object.assign({}, userku[i].topics),
            }
            console.log("userWarehouse", userWarehouse)
            await wareHouse.upsert(userWarehouse)
                .then(date => {
                    console.log("date", date)
                }).catch(err => {
                    console.log(err)
                })
        }
    }
}