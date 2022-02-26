const { db } = require('./db');
const { DataTypes } = require('sequelize');
const Blogs = db.define(
        'blogs', {
            // id: {
            //     field: 'id',
            //     type: DataTypes.UUID,
            //     autoIncrement: true, // 对postgres来说会自动转为 SERIAL
            //     primaryKey: true
            // },
            title: {
                field: 'title', // 字段名
                type: DataTypes.STRING, // 类型
            },
            content: {
                field: 'content',
                type: DataTypes.STRING
            },
            text: {
                field: 'text',
                type: DataTypes.STRING,

            },

        }, {
            timestamps: false, //取消自动添加createdAt字段
        }
    )
    /**
     *   另：数据库要设定id，为主键，为自增，(sequelize会自动添加id到数据库)
     *   如果数据库已有数据id不能出现为0。
     */

module.exports = {
    Blogs
}