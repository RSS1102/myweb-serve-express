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
    blogNavId: {
        field: 'blogNavId',
        type: DataTypes.INTEGER,
    },
    blogTitle: {
        field: 'blogTitle',
        type: DataTypes.STRING,
    },
    blogContent: {
        field: 'blogContent',
        type: DataTypes.STRING
    },
    visitedNum: {
        field: 'visitedNum',
        type: DataTypes.INTEGER,
    },
    articleShow: {
        field: 'articleShow',
        type: DataTypes.BOOLEAN,
    },
    createdAt: {
        field: 'createdAt',
        type: DataTypes.DATE,
    },
    updatedAt: {
        field: 'updatedAt',
        type: DataTypes.DATE,
    },


}, {
    timestamps: true, //自动添加createdAt,updatedAt字段
})
/**
 *   另：数据库要设定id，为主键，为自增，(sequelize会自动添加id到数据库)
 *   如果数据库已有数据id不能出现为0。
 */
// 用来删除数据库中的数据，重新创建数据库
// Blogs.sync({ force: true })
module.exports = {
    Blogs
}