const { Blogs } = require('../../sql/iweb/blogs');
// 文件上传
const multer = require('multer')
const { uploadImage } = require("../../util/fileconfig")


module.exports = {
    /**
     * 文章保存
     * @param {blogContent: 文章内容,blogNav:文章分类,blogNavId:文章分类id,blogTitle:标题}
     * @param {articleShow:是否展示文章,}
     * @deprecated visitedNum:浏览人数,
     * @retrun code res 
     */
    async saveBlogs(req, res) {
        console.log("req.body", req.body)
        const body = req.body
        let param = { ...body, articleShow: true }
        console.log("param", param)
        Blogs.create(param).then(_res => {
            // console.log("res", res)
            res.send({
                code: 200,
                data: 'success',
            })
        }).catch(err => {
            console.log("err", err)
            res.send({
                code: 500,
                data: "error"
            })
        })

    },


    /**
     * 分页、按条件获取文章table
     * @param {offset:页码,limit:每页条数,blogNav:文章分类}
     * @retrun {code} res
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
     * 上传文件
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
                // res.send({ location:req.file.filename, code: 200, msg: "图片上传成功" })
                res.send({ location: req.file.filename })
            }
        })
    },
    /**
     * 切换是否展示文章
     * @param {id:文章id,articleShow:是否展示文章}
     * @retrun {code} res
     */
    async changeArticleShow(req, res) {
        const { id, articleShow } = req.body
        Blogs.update(
            { articleShow: articleShow },
            { where: { id: id } })
            .then(_res => {
                res.send({
                    code: 200,
                    data: 'success',
                })
            }).catch(err => {
                res.send({
                    code: 500,
                    data: "error"
                })
            })
    }

}