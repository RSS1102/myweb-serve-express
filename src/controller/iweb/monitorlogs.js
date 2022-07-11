const { MonitorLogs } = require('../../sql/cweb/monitorlogs');
// pv
module.exports = {
    saveMonitor(req, res) {
        let { name, vitstDate, path, paramsKey } = req.body;
        MonitorLogs.create({
            name,
            vitstDate,
            path,
            paramsKey
        }).then(data => {
            res.send({
                code: 200,
                msg: 'success'
            })
        }).catch(err => {
            console.log({
                code: 500,
                msg: err
            })
        }
        )
    },
    // 获取每个监控页面的数量
    getMonitorName(req, res) {
        MonitorLogs.count({
            group: 'name',
            logging: true,
            attributes: ['name']
        },
        ).then(data => {
            res.send(data)
            console.log(data)
        }).catch(err => {
            console.log(err)
        }
        )
    },
    // 获取blogs下的文章阅读数量
    getMonitorKey(req, res) {
        MonitorLogs.count({
            group: 'paramsKey',
            logging: true,
            attributes: ['paramsKey'],
            where: {name:'blogs'}
        },
        ).then(data => {
            res.send(data)
            console.log(data)
        }).catch(err => {
            console.log(err)
        })
    }
}