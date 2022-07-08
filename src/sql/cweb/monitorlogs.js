const { db } = require('../db/db');
const { DataTypes } = require('sequelize');
const MonitorLogs = db.define('monitorlogs', {
    id: {

        field: 'id',
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        comment: 'id',
    },
    'name': {
        field: 'name',
        type: DataTypes.STRING,
    },
    'vitstDate': {
        field: 'vitstDate',
        type: DataTypes.DATE,
    },
    'path': {
        field: 'path',
        type: DataTypes.STRING,
    },
    'paramsKey': {
        field: 'paramsKey',
        type: DataTypes.STRING,
    },

})

//  MonitorLogs.sync({ force: true })
module.exports = {
    MonitorLogs
}
