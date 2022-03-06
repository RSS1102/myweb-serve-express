const { wareHouse, wareTopics, wareCommit } = require('../../sql/iweb/product');
module.exports = {
    getGithubList(req, res) {
        wareHouse.findAll()
            .then(deta => {
                console.log(deta)
            })


    }
}