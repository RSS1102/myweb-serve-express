const { db } = require('../db/db');
const { DataTypes } = require('sequelize');
const BlogNavs = db.define(
        'blognavs', {
            navindex: {
                field: 'navindex',
                type: DataTypes.STRING,

            },
        }, {
            timestamps: false, //自动添加createdAt,updatedAt字段
        }
    )
    /**
     *   另：数据库要设定id，为主键，为自增，(sequelize会自动添加id到数据库)
     *   如果数据库已有数据id不能出现为0。
     */

module.exports = {
    BlogNavs
}