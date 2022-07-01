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
    'gitWareDate': {
        field: 'gitWareDate',
        type: DataTypes.DATE,
    },
    'gitWareStatus': {
        field: 'gitWareStatus',
        type: DataTypes.STRING,
    }
})

// Logs.sync({ force: true })
module.exports = {
    Logs
}