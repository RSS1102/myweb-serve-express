const { Blogs } = require('../../sql/iweb/blogs');
module.exports = {
  /**
   * @param {*} res 查询blogs的导航栏
   */
    async getBlogMenu(req, res) {
        const BlogMenu = await Blogs.findAll({
            attributes: ['blogNav', 'blogTitle', 'id'],
        });
        const BlogMenuList = Object.create(null);
        BlogMenu.forEach(({
            blogNav,
            blogTitle,
            id
        }) => {
            if (BlogMenuList[blogNav]) {
                BlogMenuList[blogNav].push({ id, blogTitle })

            } else {
                BlogMenuList[blogNav] = [{ id, blogTitle }]
            }
        })
        res.send(BlogMenuList)
    },
    /** 
       * @param {id} req 文章id
       * @param {Content[0]} res 文章内容
       */
    async getBlogContent(req, res) {
        console.log(res.body)
        let id = req.body.id
        let Content = await Blogs.findAll({
            where: {
                id: id
            }
        });
        res.send(Content[0])
    },

}