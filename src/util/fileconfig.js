// 文件上传
const multer = require('multer')
// 1,图片上传处理
const storageImage = multer.diskStorage({
    // 
    // 必须是已存在的路径'src/files'
    destination: function (req, file, cb) {
        cb(null, 'src/files')
    },
    // 解决文件名中文乱码问题
    // https://github.com/expressjs/multer/pull/1102
    filename: function (req, file, cb) {
        // cb(null, Date.now() + '_' + file.originalname)
        cb(null, file.originalname)
    }
});
/**
 * 这个函数应该调用 `cb` 用boolean值来
 * 指示是否应接受该文件
 * 拒绝这个文件，使用`false`，像这样:
 * cb(null, false)
  * 接受这个文件，使用`true`，像这样:
  * cb(null, true)
  * 如果有问题，你可以总是这样发送一个错误:
  * cb(new Error('请上传图片'))
  */
const uploadFilterImage = function (req, file, cb) {
    if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/gif" &&
        file.mimetype !== "image/jpg"
    ) {
        cb(null, false)
    } else {
        cb(null, true)
    }
    // console.log("mimetype",file.mimetype)
    // cb(null, true)
   
}
const uploadImage = multer({ storage: storageImage, fileFilter: uploadFilterImage, })

module.exports = {
    uploadImage,
}