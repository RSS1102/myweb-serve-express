const { wareHouse } = require('../../sql/iweb/product');
module.exports = {
    getGithubList(req, res) {
        wareHouse.findAll()
            .then(data => {
                for (let i in data) {
                    let theData = data[i].dataValues
                    theData.ware_topicsTags = []
                    let obj = theData.ware_topics
                    let keysArr = Object.keys(obj)
                    let len = keysArr.length
                    for (let j = 0; j < len; j++) {
                        theData.ware_topicsTags.push(obj[keysArr[j]])
                    }
                    delete theData['ware_topics']
                }
                res.send(data)
            })
    }
}