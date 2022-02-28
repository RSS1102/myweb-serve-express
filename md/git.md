1. ### 需求字段：

   1. #### myWarehouse

      - name
      - description
      - html_url
      -  fork
      - forks_url
      - topics
      -  language

   2. ####  commit

      - commit.message（commit信息）

      - commit.author.name(提交者姓名)

      - committer.avatar_url(提交者头像)

      - author.date(提交时间)

      - committer.html_url(提交者主页)

        

        

2. ### 生成token([教程](https://docs.github.com/cn/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token))：

   访问后登陆github：https://github.com/settings/tokens

   **[text-token](https://github.com/settings/tokens/811616296)** ：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（**no-scope**）

3. ### 主要GitHubApi：

   ``` js
   //获取项目的基本信息（name,description，topics，html_url）[仓库名，简介，主题，仓库地址]
   https://api.github.com/repos/RSS1102/wxapp--forum
   //获取最后一次提交的记录commit（date，message），author（avatar_url，html_url）【commit（时间，留言），（提交者的头像，和地址）】
   https://api.github.com/repos/RSS1102/wxapp--forum/commits?per_page=1
   //获取readme
   https://api.github.com/repos/RSS1102/punch_card/readme
   ```

   

4. ### 创建访问：

  // 关于headers配置的问题(用来验证用户)：[User-Agent](https://blog.csdn.net/zhuming3834/article/details/77649960) ，[Authorization:]( https://blog.csdn.net/qq_42692494/article/details/101703170?utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~aggregatepage~first_rank_ecpm_v1~rank_v31_ecpm-1-101703170.pc_agg_new_rank&utm_term=github%E7%9A%84api%E8%B0%83%E7%94%A8&spm=1000.2123.3001.4430)

  // 关于port 的问题：https://segmentfault.com/q/1010000015364010

  //关于hostname的问题：https://blog.csdn.net/qappleh/article/details/99990277



 

``` js
let options={
        method: 'GET',
        port: 443, //https的默认port：443
        hostname: 'api.github.com', //这里不需要用https：//
        path: '/users/RSS1102/repos',
        headers: {
            'User-Agent': 'RSS1102'
             'Authorization': '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',
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

