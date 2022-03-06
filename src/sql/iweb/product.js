const { db } = require('./db');
const { DataTypes } = require('sequelize');
// 用户的公共库的基本信息
const wareHouse = db.define(
    'warehouse', {
        name: {
            field: 'name', // 库名
            type: DataTypes.STRING,
            primaryKey: true
        },

        description: {
            field: 'description', // 描述
            type: DataTypes.STRING
        },

        url: {
            field: 'url', // 地址
            type: DataTypes.STRING,

        },
        fork: {
            field: 'fork', // 是否跟随
            type: DataTypes.BOOLEAN,

        },
        forks_url: {
            field: 'forks_url', // fork地址
            type: DataTypes.STRING
        },
        stargazers_count: {
            field: 'stargazers_count', //点赞数量
            type: DataTypes.INTEGER,
        },
        ware_topics: {
            field: 'ware_topics', //标签
            type: DataTypes.JSONB,
        },
        ware_languages: {
            field: 'ware_languages', //语言
            type: DataTypes.JSONB,
        },
        ware_commits: {
            field: 'ware_commits', //commit
            type: DataTypes.JSONB,
        },

        updatedAt: {
            field: 'updatedAt',
            type: DataTypes.TIME,
        },
        createdAt: {
            field: 'createdAt',
            type: DataTypes.TIME,
        },

    }, {
        timestamps: true, //取消自动添加createdAt,updatedAt字段
    }
)
module.exports = {
    wareHouse,

}