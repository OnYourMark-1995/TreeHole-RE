const path = require('path')
const { PROTOCOL, HOST, PROT } = require('./serverConfig')

module.exports = {
  AVATAR_IMG_FOLDER: path.resolve(__dirname, '../public/images/userAvatars'),
  AVATAR_IMG_URL_PREFIX: `${PROTOCOL}://${HOST}:${PROT}/public/images/userAvatars/`,
  AVATAR_IMG_MAX_SIZE: 1024*1024
}