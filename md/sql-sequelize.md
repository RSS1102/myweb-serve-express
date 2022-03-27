### sql：

1. ##### sql数据库下载地址：

   - https://cdn.mysql.com/archives/mysql-installer/mysql-installer-community-8.0.11.0.msi

2. ##### 连接sql数据遇到的问题：

   1. sql的表名结尾要以"s"结尾。

### 使用“sequelize ”的连接方式连接数据库

1. [中文文档 ](https://github.com/demopark/sequelize-docs-Zh-CN)  

2. Model 的定义、使用与Model类的API（[中文文档API](https://itbilu.com/nodejs/npm/V1PExztfb.html#api-upsert)）

3. https://segmentfault.com/a/1190000015274463 (关于locahost遇到报错解决)

4. 基础连接格式 const sequelize = new Sequelize('db', 'user', 'passwrold', {
    host: 'localhost',
    port: 'port',
    dialect: 'mysql'
    });

5. 直接使用sql语句查询：

  ``` js
  const { QueryTypes } = require('sequelize');
  const users = await sequelize.query("SELECT * FROM `users`", { type: QueryTypes.SELECT });
  ```

6. 使用sequelize 方法进行增加数据（[文档](https://sequelize.org/master/manual/model-instances.html)）：

  1. 先连接数据库

  2. 创建数据模型实例

  3. 使用create添加数据。

     * ###### 数据库要设定id，为主键，为自增，(sequelize会自动添加id到数据库)

     * ###### 如果数据库已有数据id不能出现为0。

     ``` js
     //db
     const { Sequelize } = require('sequelize');
     const db = new Sequelize('web', 'root', 'root', {
         host: 'localhost',
         port: '3306',
         dialect: 'mysql',
         operatorsAliases: false,
         dialectOptions: {
             //字符集
             charset: 'utf8mb4',
             collate: 'utf8mb4_unicode_ci',
             supportBigNumbers: true,
             bigNumberStrings: true
         },
         pool: {
             max: 5,
             min: 0,
             acquire: 30000,
             idle: 10000
         },
         timezone: '+08:00' //东八时区
     })
     
     module.exports = {
         db
     }
     ```

     ``` js
     //blogs
     const { db } = require('./db');
     const { DataTypes } = require('sequelize');
     const Blogs = db.define(
         'blogs', {
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
     
     module.exports = {
         Blogs
     }
     ```

     ``` js
      let body = {"title":"1",content："1",text:"1"}
             const { Blogs } = require('../sql/iweb/blogs');
             await Blogs.create(body)
                 .then(date => {
                     console.log(date)
                     res.send(date.dataValues)
                 }).catch(err => {
                     console.log(err)
                 })
         }
     ```

10. 使用[findAll](https://sequelize.org/v6/manual/model-querying-basics.html#simple-select-queries)查询数据（默认查询全部、按字段查询、聚合查询）。

    ``` js
    // 1. 从数据库中读取整个表、2.可以使用attributes选项进行查询指定字段、3.可以使用 where按条件查找。
    //1. 从数据库中读取整个表
    const users = await User.findAll();
    //SELECT * FROM ...
    
    //2.可以使用attributes选项进行查询指定字段
    Model.findAll({
      attributes: ['foo', 'bar']
    });
    //SELECT foo, bar FROM ...为 SELECT 查询指定属性:要仅选择某些属性
    Model.findAll({
      attributes: [
        'foo',
        [sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats'],
        'bar'
      ]
    });
    //SELECT foo, COUNT(hats) AS n_hats, bar FROM ...你可以sequelize.fn用来做聚合：
    
    //3.使用[findAll.WHERE ](https://sequelize.org/v6/manual/model-querying-basics.html#simple-select-queries) 按**条件**查询数据。
    Post.findAll({
      where: {
        authorId: 2
      }
    });
    // SELECT * FROM post WHERE authorId = 2;
    ```


11. 使用[destroy](https://sequelize.org/v6/class/src/model.js~Model.html#static-method-destroy) 删除数据。

    ``` js
    //1.使用where按照条件删除数据。
    Model.destroy({
     where: {
        authorId: 2
      }
    });
    
    ```

12. 使用[update](https://sequelize.org/v6/class/src/dialects/abstract/query-interface.js~QueryInterface.html#instance-method-bulkUpdate)更改（更新）数据。

    ```js
     await BlogNavs.update(
    { navindex: body.navindex },
     {
        where: {
            id: body.id
        }
    })
    .then(date => {
        console.log(date)
        res.send(date)
    }).catch(err => {
        console.log(err)
    })
    ```

    参数

    ``` 
    update(values, options) -> Promise.<Array.<affectedCount, affectedRows>>
    values	Object	更新数据
    options	Object	条件
    options.where	Object	筛选条件
    ```

    

### 使用“sequelize ” 遇到的问题：

1. Error: Unknown column 'ware_commits' in 'field list'（ code: 'ER_BAD_FIELD_ERROR',）
   - 注意大小写，字段是否一致正确。
   - 注意是否有空格（我就犯了这个错误）

