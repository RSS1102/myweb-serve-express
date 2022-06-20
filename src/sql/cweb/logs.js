const { db } = require('../db/db');
const { DataTypes } = require('sequelize');
const Logs = db.define('logs', {
    id: {

        field: 'id',
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        comment: 'id',
    },
    'getGitWareDate': {
        field: 'getGitWareDate',
        type: DataTypes.DATE,
    },
    'getGitWareStatus': {
        field: 'getGitWareStatus',
        type: DataTypes.STRING,
    }
})

// Logs.sync({ force: true })
module.exports = {
    Logs
}