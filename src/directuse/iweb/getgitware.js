const { Authorization } = require('../../util/config/git_auth_config')
const { WareHouses } = require('../../sql/iweb/product');
const { Logs } = require('../../sql/cweb/logs')
module.exports = {
    getware() {
        // 重新创建表
        // WareHouses.sync({ force: true })
        let usersOptions = {
            url: 'https://api.github.com/users/RSS1102/repos',
            init: {
                method: 'GET',
                port: 443,
                headers: { "Authorization": "token " + Authorization }
            }
        }
        const pro = new Promise((resolve, reject) => {
            fetch(usersOptions.url, usersOptions.init)
                .then(res => {
                    // console.log(res)
                    return res.json()
                }).then(res => {
                    WareHouses.sync({ force: true }).then(() => {
                        resolve(res)
                    })
                })
        })
        pro.then(res => {
            let userku = res
            let doNum = 0
            console.log(userku.length)
            for (let i = 0; i < userku.length; i++) {
                let wareName = userku[i].name
                let languageOptions = {
                    url: `https://api.github.com/repos/RSS1102/${wareName}/languages`,
                    init: {
                        method: 'GET',
                        port: 443,
                        headers: { "Authorization": "token " + Authorization }
                    }
                }
                let commitOptions = {
                    url: `https://api.github.com/repos/RSS1102/${wareName}/commits?per_page=1`,
                    init: {
                        method: 'GET',
                        port: 443,
                        headers: { "Authorization": "token " + Authorization }
                    }
                }
                const promiseAll = [languageOptions, commitOptions].map(async options => {
                    return await fetch(options.url, options.init).then(res => {
                        return res.json()
                    }, err => {
                        console.log("map", err)
                    })
                })

                Promise.all(promiseAll).then(res => {
                    // 1.获取语言
                    // console.log(`promiseAll-${doNum}`, res)
                    let usersLanguage = res[0]
                    console.log("usersLanguage", usersLanguage)
                    // 获取提交信息
                    let usersCommit = res[1][0]
                    console.log("usersCommit", usersCommit)
                    let commitAothor = {}
                    usersCommit.author ? commitAothor = usersCommit.author : (usersCommit.committer ? commitAothor = usersCommit.committer : '')
                    let ware_commits = {
                        commit_message: usersCommit.commit.message,
                        commit_name: usersCommit.commit.author.name,
                        commit_avatar: commitAothor.avatar_url,
                        commit_html: commitAothor.html_url,
                        commit_date: usersCommit.commit.committer.date,
                    }
                    let userWarehouse = {
                        name: userku[i].name,
                        description: userku[i].description,
                        url: userku[i].html_url,
                        homepage: userku[i].homepage,
                        stargazers_count: userku[i].stargazers_count,
                        fork: userku[i].fork,
                        ware_languages: usersLanguage,
                        ware_commits: ware_commits,
                        ware_topics: Object.assign({}, userku[i].topics),
                    }

                    WareHouses.upsert(userWarehouse)
                        .then(data => {
                            console.log("data", data)
                            doNum++;
                            console.log("doNum", userku.length, doNum)
                            if (doNum == userku.length) {

                                Logs.create
                                    ({
                                        getGitWareDate: new Date(),
                                        getGitWareStatus: 'success'
                                    }).then(data => {
                                        console.log("全部完成success")
                                    })
                            }
                        }).catch(err => {
                            console.log('data', err)
                            Logs.create
                                ({
                                    getGitWareDate: new Date(),
                                    getGitWareStatus: 'fail'
                                }).then(data => {
                                    console.log("全部完成fail")
                                })
                        })

                }).catch(err => {
                    console.log("promiseAllerr", err)
                    Logs.create
                        ({
                            getGitWareDate: new Date(),
                            getGitWareStatus: 'fail'
                        }).then(data => {
                            console.log("全部完成fail")
                        })
                })
            }
        })
    }
}