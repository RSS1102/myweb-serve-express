const { db } = require('../db/db');
const { DataTypes } = require('sequelize');
// 用户的公共库的基本信息
const WareHouses = db.define('warehouses', {
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
    homepage: {
        field: 'homepage', // homepage地址
        type: DataTypes.STRING
    },
    stargazers_count: {
        field: 'stargazers_count', //点赞数量
        type: DataTypes.INTEGER,
    },
    ware_topics: {
        field: 'ware_topics', //标签
        type: DataTypes.JSON,
    },
    ware_languages: {
        field: 'ware_languages', //语言
        type: DataTypes.JSON,
    },
    ware_commits: {
        field: 'ware_commits', //commit
        type: DataTypes.JSON,
    },

    updatedAt: {
        field: 'updatedAt',
        type: DataTypes.DATE,
    },
    createdAt: {
        field: 'createdAt',
        type: DataTypes.DATE,
    },

}, {
    timestamps: true, //自动添加createdAt,updatedAt字段
}
)

// WareHouses.sync({ force: true })
module.exports = {
    WareHouses,

}