const { BlogNavs } = require('../../sql/web/blognavs');
const qs = require('qs')
module.exports = {

    async setBlogNav(req, res) {
        let body = req.body
        await BlogNavs.create(body)
            .then(date => {
                // console.log(date)
                res.send(date.dataValues)
            }).catch(err => {
                console.log(err)
            })
        res.send("success")
    },
    async getBlogNav(req, res) {

        await BlogNavs.findAll()
            .then(date => {
                // console.log(date)
                res.send(date.dataValues)
            }).catch(err => {
                console.log(err)
            })
        res.send("success")
    },
    async setBlogMenu(req, res) {
        let body = req.body
        await Blogs.create(body)
            .then(date => {
                // console.log(date)
                res.send(date.dataValues)
            }).catch(err => {
                console.log(err)
            })
        res.send("success")
    },

}