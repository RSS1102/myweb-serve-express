const { Sequelize } = require('sequelize');
const { sqlAddress } = require('../../util/config/dev');
const db = new Sequelize(sqlAddress.db, sqlAddress.user, sqlAddress.pass, {
    host: sqlAddress.sqlAddress,
    port: '3306',
    dialect: 'mysql',
    dialectOptions: {
        //字符集
        // charset: 'utf8mb4',
        // collate: 'utf8mb4_unicode_ci',
        // supportBigNumbers: true,
        // bigNumberStrings: true,
        // dateStrings: true,
        // timezone: '+08:00',  
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    timezone: '+08:00' //for writing to database
})

module.exports = {
    db
}