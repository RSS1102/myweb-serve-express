const { BlogNavs } = require('../../sql/cweb/blognavs');
const qs = require('qs')
/**
 * 获取navindex
 * 添加navindex
 * 删除navindex
 * 更新navindex
 *  @returns{id: number, code: number,blogNav: string,}
 */
module.exports = {
    async getBlogsNav(req, res) {
        await BlogNavs.findAll({ attributes: ['blogNav', 'id'] })
            .then(data => {
                res.send(data)
            }).catch(err => {
                console.log(err)
                res.send("err")
            })
    },
    // 这里要判断是否已经存在，如果存在则不能添加
    addBlogsNav(req, res) {
        const { blogNav } = req.body
        BlogNavs.findAll({
            where: { blogNav: blogNav }
        }).then(data => {
            console.log(data.length)
            if (data.length > 0) {
                res.send({
                    code: 304,
                    data: "重复的blogNav"
                })
            } else {
                BlogNavs.create({ blogNav: blogNav })
                    .then(data => {
                        console.log("2")
                        console.log("添加data", data)
                        res.send({
                            code: 200,
                            msg: "添加成功" + data
                        })
                    }).catch(err => {
                        console.log("22")
                        console.log(err)
                        res.send({
                            code: 400,
                            msg: "添加失败" + err
                        })
                    })
            }

        }).catch(err => {
            res.send({
                code: 400,
                msg: "添加失败" + err
            })
        })
    },

    async delBlogsNav(req, res) {
        // 这里应该按照id删除
        let { id } = req.body
        console.log(id)
        await BlogNavs.destroy({
            where: { id: id }
        })
            .then(data => {
                console.log(data)
                res.send({
                    code: 200,
                    data: data
                })
            }).catch(err => {
                res.send({
                    code: 400,
                    data: err
                })
            })
    },

    editBlogsNav(req, res) {
        // 这里应该按照id更改
        let { id, blogNav } = req.body
        console.log(id, blogNav)
        BlogNavs.findAll({
            where: { blogNav: blogNav }
        }).then(data => {
            console.log(data.length)
            if (data.length > 0) {
                res.send({
                    code: 304,
                    data: "重复的blogNav"
                })
            } else {
                BlogNavs.update({ blogNav: blogNav }, {
                    where: {
                        id: id
                    }
                })
                    .then(data => {

                        res.send({
                            code: 200,
                            data: data
                        })
                    }).catch(err => {
                        res.send({
                            code: 400,
                            data: err
                        })
                    })
            }
        }).catch(err => {
            res.send({
                code: 400,
                data: err
            })
        })

    },
}