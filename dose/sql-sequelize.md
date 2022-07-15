# 使用“sequelize ”的连接方式连接数据库

### sql数据库下载地址：

- https://cdn.mysql.com/archives/mysql-installer/mysql-installer-community-8.0.11.0.msi

---

1. [中文文档 ](https://github.com/demopark/sequelize-docs-Zh-CN)  

2. **Model** 的定义、使用与Model类的API（[中文文档API](https://itbilu.com/nodejs/npm/V1PExztfb.html#api-upsert)）

3. 基础连接格式

```js
 const sequelize = new Sequelize('db', 'user', 'passwrold', {
host: 'localhost',
port: 'port',
dialect: 'mysql'
});
```



4. #### 直接使用sql语句查询：

  ``` js
  const { QueryTypes } = require('sequelize');
  const users = await sequelize.query("SELECT * FROM `users`", { type: QueryTypes.SELECT });
  ```

5. #### 使用sequelize 方法进行增加数据（[文档](https://sequelize.org/master/manual/model-instances.html)）

---

1. #### 创建数据模型实例

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

2. #### 使用create添加数据。

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

3. #### 使用[findAll](https://sequelize.org/v6/manual/model-querying-basics.html#simple-select-queries)查询数据（默认查询全部、按字段查询、条件查询）。

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

4. #### 使用[destroy](https://sequelize.org/v6/class/src/model.js~Model.html#static-method-destroy) 删除数据。

``` js
//1.使用where按照条件删除数据。
Model.destroy({
 where: {
    authorId: 2
  }
});

```

5. #### 使用[update](https://sequelize.org/v6/class/src/dialects/abstract/query-interface.js~QueryInterface.html#instance-method-bulkUpdate)更改（更新）数据。

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

##### 参数

``` 
update(values, options) -> Promise.<Array.<affectedCount, affectedRows>>
values	Object	更新数据
options	Object	条件
options.where	Object	筛选条件
```

6. #### 使用[findAndCountAll](https://www.jianshu.com/p/6ff6aec4fb6e)分页查找：


    1. where 查询条件（不属于分页范畴）
    2. offset:需要忽略多少条数据。
    3. limit每次返回几条数据。
    
    ``` js
    await Blogs.findAndCountAll({
                where: { navindex: navindex },
                offset: offset,
                limit: limit,
            })
    ```

7. #### 联表查询（聚合查询）：

##### **important:**

 \* **设置外键**的时候应该以主表先进行构建，然后再设置外键(sync)

 \* 1. 先生成blogs表

 \* 2. 再生成monitorlogs表

```js
//表: Blogs（博客文章）
const Blogs = db.define('blogs', {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        comment: 'id',
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },
})
```

```js
//表：monitorlogs （博客文章访问记录）
const MonitorLogs = db.define('monitorlogs', {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
    },
    blogsKey: {
        type: DataTypes.INTEGER(11),
    },
})
```

##### **设置外键：**

```js

//一对一
//一对多
Blogs.hasMany(MonitorLogs,{foreignKey:'blogsKey'});
MonitorLogs.belongsTo(Blogs)

```

##### 联表查询

1.查询每个blogs的信息和各自访问记录：

```js
  Blogs.findAll({
            include: {
                model: MonitorLogs,
                group: 'blogsKey',
                attributes: ['blogsKey'],
                where: { name: 'blogs' },
            }
        }).then(data => {
            res.send(data)
        }).catch(err => {
            res.send(err)
        })
//console 
[{
"id": 0,
"createdAt": "2022-07-14T22:16:29.000Z",
"updatedAt": "2022-07-14T22:16:32.000Z",
-"monitorlogs": [{"blogsKey": 0}]
},{
"id": 1,
"createdAt": "2022-07-14T22:16:50.000Z",
"updatedAt": "2022-07-14T22:16:58.000Z",
-"monitorlogs":[{"blogsKey": 1},{"blogsKey": 1}]
}]
```



### 使用“sequelize ” 遇到的问题：

1. **Error: Unknown column 'ware_commits' in 'field list'（ code: 'ER_BAD_FIELD_ERROR',）**
   
   - 注意大小写，字段是否一致正确。
   - 注意是否有空格（我就犯了这个错误）
   
2. ##### 连接sql数据遇到的问题：

   1. sql的表名结尾要以"s"结尾。

3. https://segmentfault.com/a/1190000015274463 (关于**locahost**遇到报错解决)