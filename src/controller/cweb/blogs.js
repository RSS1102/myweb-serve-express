const { Blogs } = require('../../sql/iweb/blogs');
const qs = require('qs')
    /**
     * 分页、按条件获取文章
     */
    //条件-分页查找
module.exports = {
    async getBlogsPaging(req, res) {
        console.log("req.body", req.body)
        let { offset, limit, navindex } = req.body
        let { count, rows } = await Blogs.findAndCountAll({
            where: { navindex: navindex },
            offset: parseInt(offset),
            limit: parseInt(limit),
        })
        let data = { count: count, rows: rows }
        res.send(data)
    }
}