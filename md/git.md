1. ### 需求字段：

   1. #### Warehouse

      - name
      - description
      - html_url
      -  fork
      - forks_url
      - topics
      -  language

   2. ####  commit

      - commit.message（提交信息）

      - commit.author.name(提交者姓名)

      - committer.avatar_url(提交者头像)

      - author.date(提交时间)

      - committer.html_url(提交者主页)

        

        

2. ### 生成token([教程](https://docs.github.com/cn/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token))：

   访问后登陆github：https://github.com/settings/tokens

   **[text-token](https://github.com/settings/tokens/811616296)**  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 **no-scope**）

3. ### 主要GitHubApi：

   | 获取项目的基本信息                                           |
   | ------------------------------------------------------------ |
   | https://api.github.com/repos/RSS1102/wxapp--forum            |
   | 获取最后一次提交的记录commit                                 |
   | https://api.github.com/repos/RSS1102/wxapp--forum/commits?per_page=1 |
   | 获取readme                                                   |
   | https://api.github.com/repos/RSS1102/punch_card/readme       |

1. ### 创建访问：

   1. https模块：

  // 关于port 的问题：https://segmentfault.com/q/1010000015364010

  //关于hostname的问题：https://blog.csdn.net/qappleh/article/details/99990277

  // 关于headers配置的问题(用来验证用户)：[User-Agent](https://blog.csdn.net/zhuming3834/article/details/77649960) ，[Authorization:]( https://blog.csdn.net/qq_42692494/article/details/101703170?utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~aggregatepage~first_rank_ecpm_v1~rank_v31_ecpm-1-101703170.pc_agg_new_rank&utm_term=github%E7%9A%84api%E8%B0%83%E7%94%A8&spm=1000.2123.3001.4430) 

``` js
使用https模块(目前没有解决异步问题所以使用了)
let options={
        method: 'GET',
        port: 443, //https的默认port：443
        hostname: 'api.github.com', //这里不需要用https：//
        path: '/users/RSS1102/repos',
        headers: {
            'User-Agent': 'RSS1102'
             'Authorization': '',
        } 
    }
    // 这里不能用request,用get
https.get(options, _res => {
    let body = '';
    _res.on('data', data => body += data);
    _res.on('end', () => {
        console.log(body)
    })
    _res.on('error', err => {
        console.log("err", err)
    })

})
```

2. request-promise([**用来实现https的同步请求**](https://github.com/request/request-promise))

   ``` js
   let options = {
       uri: 'https://api.github.com/user/repos',
       qs: {
           access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
       },
       headers: {
           'User-Agent': 'Request-Promise'
       },
       json: true // Automatically parses the JSON string in the response
   };
   
   rp(options)
       .then(function (repos) {
           console.log('User has %d repos', repos.length);
       })
       .catch(function (err) {
           // API call failed...
       });
