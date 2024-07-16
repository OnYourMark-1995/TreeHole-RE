const path = require('path')
const fs = require('fs/promises')
const url = require('url')
const userDao = require("../dao/userDao")
const userSchemas = require("../../schema/userSchemas")
const { jwtSign } = require("../../utils/jwtTool")
const { AVATAR_IMG_URL_PREFIX, AVATAR_IMG_FOLDER } = require("../../config/avatarImgStorageConfig")
const { DEFAULT_AVATAR_IMG } = require("../../config/userConfig")
const cryptPassword = require('../../utils/cryptPassword')


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
      console.log(error);
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
      // const insertResult = await userDao.insertUser(user)
      const insertResult = await userDao.insertUser({
        ...user,
        password: process.env.NODE_ENV === 'production' ? cryptPassword(user.password) : user.password
      })
      
      const token = jwtSign({
        userId: insertResult.userId,
        username: insertResult.username
      })

      const userInfo = {
        userId: insertResult.userId,
        username: insertResult.username,
        email: insertResult.email,
        gender: 'secret',
        avatarImg: url.resolve(AVATAR_IMG_URL_PREFIX, DEFAULT_AVATAR_IMG)
      }

      return { 
        token,
        userInfo
      }

    } catch (error) {
      console.log(error);
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

    const password = process.env.NODE_ENV === 'production' ? cryptPassword(user.password) : user.password
    try {
      if(user.username && user.username !== ''){
        selectResults = await userDao.selectUserByUsernameAndPassword(user.username, password)
      } 
      else if (user.email && user.email !== '') {
        selectResults = await userDao.selectUserByEmailAndPassword(user.email, password)
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

    const userInfo = {
      ...selectResults[0],
      avatarImg: url.resolve(AVATAR_IMG_URL_PREFIX, selectResults[0].avatarImg)
    }

    return { 
      token,
      userInfo
    }
  },

  /**
   * 更新用户信息（更新头像在另一个函数updateAvatarImg中处理）
   * @param {Object} user 
   */
  updateInfo: async (user) => {
    const { error, value } = userSchemas.updateInfo.validate(user)
    if(error) throw new Error("参数校验不通过")

    let queryResult
    
    // 检查 新用户名 是否被其他用户占用
    try {
      queryResult = await userDao.selectUserIdByUsername(user.username)
    } catch (error) {
      console.log(error)
      throw new Error("数据库操作异常，请稍后再试")
    }
    // 查询新用户名的结果不为空，并且查询到的 id 不为 当前用户的 id，说明
    // 待更新的用户名已被占用。（如果 查询到的 id 等于 当前用户的 id，说明
    // 用户更新个人信息并没有修改用户名，用户名还是原来那个） 
    if(queryResult != null && queryResult.userId != user.userId){
      throw new Error("用户名已被占用，用户信息更新失败")
    }

    // 检查 新电子邮箱 是否已被占用
    try {
      queryResult = await userDao.selectUserIdByEmail(user.email)
    } catch (error) {
      console.log(error)
      throw new Error("数据库操作异常，请稍后再试")
    }
    if(queryResult != null && queryResult.userId != user.userId){
      throw new Error("电子邮箱已被占用，用户信息更新失败")
    }
    
    // 更新 用户数据
    try {
      await userDao.updateUserInfo(user)
      return {
        username: user.username,
        email: user.email,
        gender: user.gender 
      }
    } catch (error) {
      console.log(error);
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
    
    // 删除原头像文件。如果原来的头像是默认头像（即注册后的初始头像），则不需要删除。
    if(oldAvatarImg !== DEFAULT_AVATAR_IMG){
      // TODO: 将删除文件的操作改为异步，不影响响应返回的速度。
      try {
        const fsResult = await fs.rm(path.join(AVATAR_IMG_FOLDER, oldAvatarImg))
        console.log(fsResult);
      } catch (error) {
        console.log('头像文件删除异常：', error);
      }
    }

    // 返回新头像图片的 URL
    return { avatarImg: url.resolve(AVATAR_IMG_URL_PREFIX, newAvatarImgFileName) }
  }
}

module.exports = userService