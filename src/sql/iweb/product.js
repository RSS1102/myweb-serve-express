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
                field: 'stargazers_count',
                type: DataTypes.INTEGER,
            },

        }, {
            timestamps: false, //取消自动添加createdAt字段
        }
    )
    // 用户的公共库的标签
const wareTopics = db.define(
        'waretopics', {

            name: {
                field: 'name', // 库名
                type: DataTypes.STRING,
                primaryKey: true
            },
            topics: {
                field: 'topics',
                type: DataTypes.JSON,
            },

        }, {
            timestamps: false, //取消自动添加createdAt字段
        }
    )
    // 用户的公共库的最后提交记录
const wareCommit = db.define(
    'warecommits', {

        name: {
            field: 'name', // 库名
            type: DataTypes.STRING,
            primaryKey: true
        },
        commit: {
            field: 'commit',
            type: DataTypes.JSON,
        },

    }, {
        timestamps: false, //取消自动添加createdAt字段
    }
)

module.exports = {
    wareHouse,
    wareTopics,
    wareCommit
}