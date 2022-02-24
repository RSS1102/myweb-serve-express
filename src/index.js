const express = require('express')
const app = express()
const port = 3000

const router = require('./router/index')
    /**
     * 导入路由
     */
app.use(router)

// app.use(express.json())

app.get('/', async(req, res) => {
    res.send('进入后端......')

})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})