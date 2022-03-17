# myHost—(express)

##### Main Technology [Stack](https://shields.io/):

[![node](https://img.shields.io/badge/node-14.8.03-green)](https://nodejs.org/zh-cn/) [![express](https://img.shields.io/badge/express-%5E5.0.0--beta.1-green)](https://www.expressjs.com.cn/) [![nodemon](https://img.shields.io/badge/nodemon-%5E2.0.15-green)](https://nodemon.io/) [![sequelize](https://img.shields.io/badge/sequelize-%5E6.16.2-green)](https://sequelize.org/)  [![request-promise](https://img.shields.io/badge/request--promise-%5E4.2.6-green)](https://www.npmjs.com/package/nodemon)   [![mysql2](https://img.shields.io/badge/mysql2-%5E2.3.3-green)](https://www.npmjs.com/package/mysql2)     [![qs](https://img.shields.io/badge/qs-%5E6.10.3-green)](https://www.npmjs.com/package/qs)   [![badge/body--parser](https://img.shields.io/badge/body--parser-%5E1.19.2-green)](https://github.com/expressjs/body-parser) 

---

1. #### Module functions（npm）：

   - node:服务器环境
   - express：后端框架
   - body-parser：Node.js 正文解析中间件，解析`req.body`数据
   - mysql2：sequelize操作MySQL所需要的环境
   - sequelize：node操作MySQL的工具
   - request-promise：request同步请求
   - qs：一个查询字符串解析和字符串化库
   - nodemon：自动检测到目录中的文件更改时通过重新启动应用程序来调试基于node.js的应用程序。

2. #### (Catalogue（outline）：

   ``` 
   ├─image
   ├─md
   ├─node_modules (npm)
   ├─src
   │  ├─controller (控制器：写一些前后端交互)
   │  │  └─iweb
   │  ├─directuse (写在后端运行的逻辑)
   │  │  └─iweb
   │  ├─router （路由）
   │  └─sql （mysql数据库）
   │      └─iweb
   ├─util （一些配置文件）
   └─index (起始文件)
   ```

3. #### main function：

   1. Use 'GithubAPI' to get their own Github warehouse project information.  And then store it in `MySQL`.  
   2. **'Github information'** will be sent to the front-end display, and the use of `qs` on the **'second two-dimensional'** after the object or array of data processing, so that the correct transmission to the people in need.  
   3. The entry, storage and reading of my blogs information -- it's ongoing.  

