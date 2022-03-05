const reqs = require('request-promise');
const { Authorization } = require('../../../util/git')
const { wareHouse, wareTopics, wareCommit } = require('../../sql/iweb/product');
module.exports = {
    async getware() {
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
                console.log("userku", userku)

            })
        for (let i = 0; i < userku.length; i++) {
            let wareName = userku[i].name
            let userWarehouse = {
                name: userku[i].name,
                description: userku[i].description,
                url: userku[i].url,
                forks_url: userku[i].forks_url,
                language: userku[i].language,
                stargazers_count: userku[i].stargazers_count,
                fork: userku[i].fork,

            }
            await wareHouse.upsert(userWarehouse)
                .then(date => {
                    // console.log(date)
                }).catch(err => {
                    console.log(err)
                })

            setwareTopics(wareName)
            setwareCommit(wareName)
        }
    }
}


const setwareCommit = (wareName) => {
    let commitDate = {}
    let commitOptions = {
        uri: `https://api.github.com/repos/RSS1102/${wareName}/commits?per_page=1`,
        method: 'GET',
        port: 443,
        headers: {
            'User-Agent': 'RSS1102',
            'Authorization': Authorization,
        }
    }
    reqs(commitOptions)
        .then(res => {
            let usersCommit = JSON.parse(res)[0]
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
            commitDate = {
                name: wareName,
                commit: usersCommit,
            }
            wareCommit.upsert(commitDate)
                .then(date => {
                    // console.log(date)
                }).catch(err => {
                    console.log(err)
                })
        })
}
const setwareTopics = (wareName) => {
    let usersTopics = {}
    let topicsOptions = {
        uri: `https://api.github.com/repos/RSS1102/${wareName}/languages`,
        method: 'GET',
        port: 443,
        headers: {
            'User-Agent': 'RSS1102',
            'Authorization': Authorization,
        }
    }
    reqs(topicsOptions)
        .then(res => {
            usersTopics = JSON.parse(res)
            let topicsDate = {
                name: wareName,
                topics: usersTopics,
            }
            wareTopics.upsert(topicsDate)
                .then(date => {
                    // console.log(date)
                }).catch(err => {
                    console.log(err)
                })
        })

}