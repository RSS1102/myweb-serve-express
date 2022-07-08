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
    getMonitor(req, res) {
        MonitorLogs.findAll().then(data => {
            res.send(data)
        }).catch(err => {
            console.log(err)
        }
        )
    }
}