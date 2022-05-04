const { Blogs } = require('../../sql/iweb/blogs');


module.exports = {
    /**
     * 文章保存
     * @param {article} req 
     * @param {code} res 
     */
    async saveBlogs(req, res) {
        console.log("req.body", req.body)
        Blogs.create(req.body).then(res => {

        }).catch(err => {
            res.send({
                code: 500,
                status: err
            })
        })

    },


    /**
     * 分页、按条件获取文章
     */
    async getBlogs(req, res) {
        console.log("req.body", req.body)
        let { offset, limit, blogNav } = req.body
        if (!blogNav) {
            console.log("空")
            let { count, rows } = await Blogs.findAndCountAll({
                offset: parseInt(offset),
                limit: parseInt(limit),
            })
            let data = { count: count, rows: rows }
            res.send(data)
        } else {
            console.log("非空")
            let { count, rows } = await Blogs.findAndCountAll({
                where: { blogNav: blogNav },
                offset: parseInt(offset),
                limit: parseInt(limit),
            })
            let data = { count: count, rows: rows }
            res.send(data)
        }


    },
    /**
     * 获取到上传文件信息
     * @param {file} req 
     * @param {location} res 
     */
    async upLoadFile(req, res) {
        console.log(req.file)
        res.send({ location: req.file.filename })
    },
}