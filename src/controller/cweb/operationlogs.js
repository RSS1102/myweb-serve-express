const { Logs } = require('../../sql/cweb/logs')
module.exports = {
    getActionDone(req, res) {
        // 查询最后7条数据
        Logs.findAll({
            order: [['id', 'DESC']],
            limit: 7
        })
            .then(data => {
                res.send({
                    code: 200,
                    data: data
                })
            }).catch(err => {
                console.log(err)
                res.send({
                    code: 500,
                    data: '服务器错误'
                })
            })

    },
}