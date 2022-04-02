const { Blogs } = require('../../sql/iweb/blogs');
const qs = require('qs')
    //条件-分页查找
module.exports = {
    async getBlogsPaging(req, res) {
        let { offset, limit, navindex } = req.body
        console.log(body)
        await Blogs.findAndCountAll({
            where: { navindex: navindex },
            offset: offset,
            limit: limit,
        }).then(data => {
            res.send(data)
        }).catch(err => {

        })
    }
}