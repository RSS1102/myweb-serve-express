const { db } = require('../db/db');
const { DataTypes } = require('sequelize');
const MonitorLogs = db.define('monitorlogs', {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    vitstDate: {
        type: DataTypes.DATE,
    },
    path: {
        type: DataTypes.STRING,
    },
    blogsKey: {
        type: DataTypes.INTEGER(11),

    },
},
    {
        timestamps: true,
        //自动添加createdAt,updatedAt字段
    }
)

//  MonitorLogs.sync({ force: true });

module.exports = {
    MonitorLogs
}
