const { Logs } = require('../../sql/cweb/logs')
module.exports = {
    getActionDone(req, res) {
        Logs.findAll({})
            .then(data => {
                res.send({
                    code: 200,
                    data: data
                })
            }).catch(err => {
                res.send({
                    code: 500,
                    data: '服务器错误'
                })
            })

    }
}