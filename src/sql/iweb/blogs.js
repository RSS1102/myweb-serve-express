const { db } = require('../db/db');
const { DataTypes } = require('sequelize');
const Blogs = db.define('blogs', {
        // id: {
        //     field: 'id',
        //     type: DataTypes.UUID,
        //     autoIncrement: true, // 对postgres来说会自动转为 SERIAL
        //     primaryKey: true
        // },
        blogNav: {
            field: 'blogNav',
            type: DataTypes.STRING,

        },
        blogTitle: {
            field: 'blogTitle', // 字段名
            type: DataTypes.STRING, // 类型
        },
        blogContent: {
            field: 'blogContent',
            type: DataTypes.STRING
        },
        createdAt: {
            field: 'createdAt',
            type: DataTypes.TIME,
        },
        updatedAt: {
            field: 'updatedAt',
            type: DataTypes.TIME,
        },
        visitedNum: {
            field: 'visitedNum',
            type: DataTypes.INTEGER,
        },
        articleShow: {
            field: 'articleShow',
            type: DataTypes.INTEGER,
        },

    }, {
        timestamps: true, //自动添加createdAt,updatedAt字段
    })
    /**
     *   另：数据库要设定id，为主键，为自增，(sequelize会自动添加id到数据库)
     *   如果数据库已有数据id不能出现为0。
     */

module.exports = {
    Blogs
}