const { BlogNavs } = require('../../sql/cweb/blognavs');
const qs = require('qs')

module.exports = {
    async getBlogNav(req, res) {

        await BlogNavs.findAll({ attributes: ['navindex', 'id'] })
            .then(date => {
                console.log("date", date)
                res.send(date)
            }).catch(err => {
                console.log(err)
                res.send("err")
            })
    },
    async addBlogNav(req, res) {
        let body = req.body
        console.log(body)
        await BlogNavs.create(body)
            .then(date => {
                console.log(date)
                res.send(date)
            }).catch(err => {
                console.log(err)
            })
    },

    async delBlogNav(req, res) {
        // 这里应该按照id删除
        let body = req.body
        if (Object.keys(body)[0] !== "id") {
            res.send("err,只允许按照`id`删除,请上传id")
            return
        }
        await BlogNavs.destroy({
                where: body
            })
            .then(date => {
                // console.log(date)
                res.send(date)
            }).catch(err => {
                console.log(err)
            })
    },
    async upBlogMenu(req, res) {
        // 这里应该按照id更改
        let body = req.body
        let ObjectKeys = Object.keys(body)
        let ID = ''
        for (let i in ObjectKeys) {
            console.log(i, ObjectKeys[i])
            ObjectKeys[i] === "id" ? ID = ObjectKeys[i] : ""
            console.log(ID)
        }
        if (ID === "id") {
            await BlogNavs.update({ navindex: body.navindex }, {
                    where: {
                        id: body.id
                    }
                })
                .then(date => {
                    console.log(date)
                    res.send(date)
                }).catch(err => {
                    console.log(err)
                })
            return
        } else {
            console.log("请上传id")
            res.send("err,只允许按照`id`更改,请上传id")
        }
    },


}