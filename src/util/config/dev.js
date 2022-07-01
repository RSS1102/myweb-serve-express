const { sqlDev, portDev } = require('./dev.development.js');
const { sqlProd, portProd } = require('./dev.production.js');
let sqlAddress = {}
let port = null
const __ENV__ = process.env.NODE_ENV;
//测试环境
if (__ENV__ === "development") {
    sqlAddress = sqlDev
    port = portDev
}

// 生产环境
if (__ENV__ === 'production') {
    sqlAddress = sqlProd
    port = portProd
}
module.exports = {
    sqlAddress,
    port
}