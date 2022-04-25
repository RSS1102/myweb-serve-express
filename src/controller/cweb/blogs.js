const { Blogs } = require('../../sql/iweb/blogs');

const fs = require('fs')
    /**
     * 分页、按条件获取文章
     */
    //条件-分页查找
module.exports = {
    async getBlogsPaging(req, res) {
        console.log("req.body", req.body)
        let { offset, limit, navindex } = req.body
        if (navindex == "") {
            let { count, rows } = await Blogs.findAndCountAll({
                offset: parseInt(offset),
                limit: parseInt(limit),
            })
            let data = { count: count, rows: rows }
            res.send(data)
        } else {
            let { count, rows } = await Blogs.findAndCountAll({
                where: { navindex: navindex },
                offset: parseInt(offset),
                limit: parseInt(limit),
            })
            let data = { count: count, rows: rows }
            res.send(data)
        }


    },
    /**
     * 获取到上传文件信息
     * "fs"操作改名，更改后缀名
     *如果重名则直接返回文件名，不接受文件
     * @param {file} req 
     * @param {image} res 
     */
    async upLoadFile(req, res) {
        console.log(req.file)
        res.send(req.file)
    }

}