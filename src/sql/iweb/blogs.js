const { db } = require('../db/db');
const { DataTypes } = require('sequelize');
const { MonitorLogs } = require('../cweb/monitorlogs');
const Blogs = db.define('blogs', {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        comment: 'id',
    },
    blogNav: {
        type: DataTypes.STRING,
    },
    blogNavId: {
        type: DataTypes.INTEGER,
    },
    blogTitle: {
        type: DataTypes.STRING,
    },
    blogContent: {
        type: DataTypes.STRING
    },
    visitedNum: {
        type: DataTypes.INTEGER,
    },
    articleShow: {
        type: DataTypes.BOOLEAN,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },
},
    {
        timestamps: true,
        //自动添加createdAt,updatedAt字段
    }
)
/**
 *   另：数据库要设定id，为主键，为自增，(sequelize会自动添加id到数据库)
 *   如果数据库已有数据id不能出现为0。
 */

// 表建立了联系
/**
 * 设置外键的时候应该以主表先进行构建，然后再设置外键
 * 表建立了联系(sync)
 * 先生成blogs表
 * 2再生成monitorlogs表
 */
Blogs.hasMany(MonitorLogs,{foreignKey:'blogsKey'});
MonitorLogs.belongsTo(Blogs)

// 用来删除数据库中的数据，重新创建数据库
 // Blogs.sync({ force: true })


module.exports = {
    Blogs
}