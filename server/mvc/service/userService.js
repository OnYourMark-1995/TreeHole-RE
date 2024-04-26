const userDao = require("../dao/userDao")
const userSchemas = require("../../schema/userSchemas")
const { jwtSign } = require("../../utils/jwtTool")
const { AVATAR_IMG_FLODER } = require("../../config/avatarImgStorageConfig")
const path = require('path')
const fs = require('fs/promises')
const { DEFAULT_AVATAR_IMG } = require("../../config/userConfig")

const userService = {
  /**
   * 注册新用户
   * @param {Object} user 
   */
  register: async (user) => {
    const { value, error } = userSchemas.register.validate(user)
    if(error) throw new Error("参数校验不通过")

    // 查询数据库，查看 用户名 和 邮箱 是否重复
    let queryResults
    try {
			queryResults = await userDao.selectUserIdByUsernameOrEmail(user.username, user.email)
		} catch (error) {
			throw new Error("数据库操作异常，请稍后再试")
		}

    // 对查询结果进行分析
    if (queryResults.length === 1) {
      if(queryResults[0].email === user.email) throw new Error("此电子邮箱已注册")
      if(queryResults[0].username === user.username) throw new Error("该用户名已被占用")
    } else if (queryResults.length === 2) {
      throw new Error("此电子邮箱已注册，且此用户名已被占用")
    }

    // 插入新用户数据
    try {
      const insertResult = await userDao.insertUser(user)
      const token = jwtSign({
        userId: insertResult.userId,
        username: insertResult.username
      })

      return { token }

    } catch (error) {
      throw new Error("数据库操作异常，请稍后重试")
    }

  },

  /**
   * 用户登录
   * @param {Object} user 
   */
  login: async (user) => {
    const { error, value } = userSchemas.login.validate(user)
    if(error) throw new Error("参数校验不通过")

    let selectResults
    try {
      if(user.username && user.username !== ''){
        selectResults = await userDao.selectUserByUsernameAndPassword(user.username, user.password)
      } 
      else if (user.email && user.email !== '') {
        selectResults = await userDao.selectUserByEmailAndPassword(user.email, user.password)
      }
    } catch (error) {
      throw new Error("数据库操作异常，请稍后再试")
    }

    if(selectResults.length === 0 ){
      throw new Error("用户名/电子邮箱 或 密码错误")
    }

    const token = jwtSign({
      userId: selectResults[0].userId,
      username: selectResults[0].username
    })

    return { token }
  },

  /**
   * 更新用户信息（更新头像在另一个函数updateAvatarImg中处理）
   * @param {Object} user 
   */
  updateInfo: async (user) => {
    const { error, value } = userSchemas.updateInfo.validate(user)
    if(error) throw new Error("参数校验不通过")

    try {
      await userDao.updateUserInfo(user)
    } catch (error) {
      throw new Error("数据库操作异常，请稍后再试")
    }
  },

  /**
   * 更新用户头像
   * @param {Number} userId 用户id
   * @param {String} newAvatarImgFileName 新头像图片名
   */
  updateAvatarImg: async (userId, newAvatarImgFileName) => {
    let oldAvatarImg
    try {
      const results = await userDao.selectUserAvatarImg(userId)
      oldAvatarImg = results[0].avatarImg
      await userDao.updateUserAvatarImg(userId, newAvatarImgFileName)
    } catch (error) {
      throw new Error("数据库操作异常，请稍后再试")
    }
    
    if(oldAvatarImg === DEFAULT_AVATAR_IMG){
      return
    }
    try {
      const fsResult = await fs.rm(path.join(AVATAR_IMG_FLODER, oldAvatarImg))
      console.log(fsResult);
    } catch (error) {
      console.log('头像文件删除异常：', error);
    }
  }
}

module.exports = userService