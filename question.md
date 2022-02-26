``` js
(格式化数据)
let blogs = await sequelize.query("select * from blogs", { type: QueryTypes.SELECT });
let data2 = Object.entries(blogs.reduce((o, v) =>
(Reflect.has(o, v.title) ?
 Reflect.get(o, v.title).push(v) :
 Reflect.set(o, v.title, []), Reflect.deleteProperty(v, 'title'), o), {}))
 .map(v => ({ title: v[0], SecondNavBar: v[1] }))
 console.log("blogs", data2)
```

