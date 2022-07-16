const sequelize = require('sequelize');
const { MonitorLogs } = require('../../sql/cweb/monitorlogs');
const { Blogs } = require('../../sql/iweb/blogs');
// pv
module.exports = {
    saveMonitor(req, res) {
        let { name, vitstDate, path, blogsKey } = req.body;
        MonitorLogs.create({
            name,
            vitstDate,
            path,
            blogsKey
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
    // 获取每个监控页面（主路由）的数量
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
        Blogs.findAll({
            include: {
                model: MonitorLogs,
                group: 'blogsKey',
                attributes: ['blogsKey'],
                where: { name: 'blogs' },
            }
        }).then(data => {
            res.send(data)
        }).catch(err => {
            res.send(err)
        })
    }
}