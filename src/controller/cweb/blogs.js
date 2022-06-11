const { Blogs } = require('../../sql/iweb/blogs');
// 文件上传
const multer = require('multer')
const { uploadImage } = require("../../util/fileconfig")


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
     * @param {{err:{code:400,msg:"请上传正确的图片格式"},success:{location,code:200,msg:"图片上传成功"}}} res 
     */
    upLoadFile(req, res) {
        uploadImage.single('file')(req, res, function (err) {
            console.log(req.file)
            if (err instanceof multer.MulterError) {
                // 发生错误
                res.send({
                    code: 400,
                    msg: "请上传正确的图片格式1",
                })
            } else if (err) {
                // 发生错误
                res.send({
                    code: 400,
                    msg: "请上传正确的图片格式2",
                })
            } else {
                // 一切都好
                res.send({ location:req.file.filename, code: 200, msg: "图片上传成功" })
            }
        })
    },

}