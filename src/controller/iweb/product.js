const { WareHouses } = require('../../sql/iweb/product');
const qs = require('qs')
module.exports = {
    getGithubList(req, res) {
        WareHouses.findAll()
            .then(data => {
                console.log(data)
                for (let i in data) {
                    let theData = data[i].dataValues
                    theData.ware_topicsTags = []
                    let obj =theData.ware_topics
                    let keysArr = Object.keys(obj)
                    let len = keysArr.length
                    for (let j = 0; j < len; j++) {
                        theData.ware_topicsTags.push(obj[keysArr[j]])
                    }

                    let qsTags = qs.stringify({ topicstags: theData.ware_topicsTags }, { arrayFormat: 'indices' })
                    let qsCommits = qs.stringify(theData.ware_commits, { arrayFormat: 'repeat' })
                    let qsLanguages = qs.stringify(theData.ware_languages, { arrayFormat: 'repeat' })
                    theData.ware_topicsTags = qsTags
                    theData.ware_commits = qsCommits
                    theData.ware_languages = qsLanguages
                    delete theData['ware_topics']
                }
                res.send(data)
            }).catch(err => {
                console.log(err)
            })
    }
}