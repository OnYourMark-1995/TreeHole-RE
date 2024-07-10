const path = require('path')
const { PROTOCOL, HOST, PROT } = require('./serverConfig')

module.exports = {
  // 头像文件 的服务器磁盘存储位置
  AVATAR_IMG_FOLDER: path.resolve(__dirname, '../public/images/userAvatars'),
  // 头像图片文件的 请求url前缀
  AVATAR_IMG_URL_PREFIX: `${PROTOCOL}://${HOST}:${PROT}/public/images/userAvatars/`,
  // 头像图片文件 的 最大体积，单位为 字节
  AVATAR_IMG_MAX_SIZE: 1024*1024,
  // 头像文件 上传时 指定的 表单名
  AVATAR_IMG_UPLOAD_FORM_NAME: 'avatarImg'
}