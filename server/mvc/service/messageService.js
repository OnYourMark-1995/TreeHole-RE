const url = require('url')
const moment = require('moment')
const { AVATAR_IMG_URL_PREFIX } = require("../../config/avatarImgStorageConfig")
const messageSchemas = require("../../schema/messageSchemas")
const messageDao = require("../dao/messageDao")
const SSETool = require('../../utils/SSETool')
const { createResponseResult } = require('../../utils/responseTool')

/**
 * 向所有 SSE 连接 发送一条消息
 * @param {*} messageId 待发送的消息的 id
 */
async function sendOneMessageToAllSSEConnection(messageId) {
  const result = await messageDao.getOneMessage(messageId)
  messageFormat(result)

  const responseResult = createResponseResult(
    2004, "收到一位用户发送的一条新消息", result
  )
  SSETool.sendJsonToAllConnections(responseResult)
}

/**
 * 格式化 消息 
 * @param {*} message 待格式化的消息
 */
function messageFormat(message) {
  // 将从数据库获取的 消息发送者的头像的文件名 和 url前缀 合并形成 完整的图片url路径
  message.avatarImg = url.resolve(AVATAR_IMG_URL_PREFIX, message.avatarImg)
  // 格式化 数据库的时间数据
  message.date = moment(message.date).format("YYYY-MM-DD HH:mm")
} 

const messageService = {
  /**
   * 建立 客户端与服务器 Server-Sent Events 连接。
   * @param {*} res Express框架的 response 响应对象
   */
  sseConnect: (req, res) => {
    // TODO: 是否移除 req属性。原本监听了 req 的 close 事件，所以传递这个参数，但是后面发现只要监听 res 上的 close 事件即可，req不需要传递了。
    // TODO: 此处不涉及数据的处理，只是建立连接而已，考虑是否移到controller层，而不是在service层
    const sseConnection = SSETool.addConnection(req, res)

    const responseResult = createResponseResult(2003, 'SSE 连接成功')
    // SSETool.sendJsonToConnection(res, responseResult)
    sseConnection.sendJson(responseResult)
  },

  /**
   * 关闭 客户端与服务器 Server-Sent Events 连接。
   * @param {*} lastEventId SSE 连接的 id
   */
  // TODO: 不确定用不用这个接口，因为如果网页是正常关闭的，
  // 在前端设置了调用 EventSource对象的 close 方法，会断开连接，触发
  // response 响应对象的 close 事件，那么就不需要前端发请求通知关闭连接了
  sseClose: (lastEventId) => {
    SSETool.removeConnection(lastEventId)
  },

  /**
   *  获取 10条 消息
   * @param {Number} leastMessageId 用户已获取的所有消息中 messageId 最小的消息的 messageId。小于等于 0 时返回最新的 10条 数据
   * @param {Number} userId 用户id
   * @returns 
   */
  getMessage: async (leastMessageId, userId) => {
    let messageList = [] // 保存 数据库中查询到的消息数据
    let hasMoreMessage = true // 是否还有更多的数据

    try {
      // leastMessageId 小于等于 0 时，返回最新的 10条 数据；大于 0 时，根据 leastMessageId 返回数据
      if(leastMessageId <= 0) {
        messageList = await messageDao.getMessageByLeastMessageId(null, userId)
      } else {
        messageList = await messageDao.getMessageByLeastMessageId(leastMessageId, userId)
      }
    } catch (error) {
      console.log(error);
      throw new Error("数据库操作异常，请稍后再试")
    }

    // 查询到的消息不满 10 条，说明后面没有更多的数据了，用户已经获取了所有的消息
    if(messageList.length < 10) {
      hasMoreMessage = false
    }
    messageList.forEach(message => messageFormat(message))

    return { messageList, hasMoreMessage }
  },

  /**
   * 获取 某个用户 发送过的消息
   * @param {Number} userId 用户id
   * @param {Number} leastMessageId 用户已获取的所有消息中 messageId 最小的消息的 messageId。小于等于 0 时返回最新的 10条 数据
   * @returns 
   */
  getMessageByUser: async (userId, leastMessageId) => {
    let hasMoreMessage = true
    let messageList

    try {
      // leastMessageId 小于等于 0 时，返回最新的 10条 数据；大于 0 时，根据 leastMessageId 返回数据
      if(leastMessageId <= 0){
        messageList = await messageDao.getMessageByUserId(userId)
      } else {
        messageList = await messageDao.getMessageByUserId(userId, leastMessageId)
      }
    } catch (error) {
      console.log(error);
      throw new Error("数据库操作异常，请稍后再试")
    }

    messageList.forEach(message => messageFormat(message))
    // 查询到的消息不满 10 条，说明后面没有更多的数据了，用户已经获取了所有的消息
    if(messageList.length < 10) {
      hasMoreMessage = false
    }

    return { hasMoreMessage, messageList }
  },

  /**
   * 获取 某个用户 点过赞的消息
   * @param {Number} userId 用户id
   * @param {Number} leastLikedId 用户已获取的点过赞的消息中 messageId 最小的消息的 messageId。小于等于 0 时返回最新的 10条 数据
   * @returns 
   */
  getUserLikedMessage: async (userId, leastLikeDetailId) => {
    let hasMoreMessage = true
    let messageList
    
    try {
      // leastLikedId 小于等于 0 时，返回最新的 10条 数据；大于 0 时，根据 leastLikedId 返回数据
      if(leastLikeDetailId <= 0){
        messageList = await messageDao.getLikedMessageByUserId(userId)
      } else {
        messageList = await messageDao.getLikedMessageByUserId(userId, leastLikeDetailId)
      }
    } catch (error) {
      console.log(error);
      throw new Error("数据库操作异常，请稍后再试")
    }

    messageList.forEach(message => messageFormat(message))
    // 查询到的消息不满 10 条，说明后面没有更多的数据了，用户已经获取了所有的消息
    if(messageList.length < 10) {
      hasMoreMessage = false
    }

    return { hasMoreMessage, messageList }
  },

  /**
   * 添加一条新的消息
   * @param {Object} message 待插入的新消息
   */
  addMessage: async ( message ) => {
    const { value, error } = messageSchemas.add.validate(message)
    if(error) throw Error('参数校验不通过')

    try {
      const result = await messageDao.insertMessage(message.content, message.date, message.userId)
      
      // 发送新消息给所有已连接的用户，使用异步操作，防止发送新消息的逻辑 拖慢 插入新消息请求的响应
      setTimeout(async () => {
        await sendOneMessageToAllSSEConnection(result.insertId)
        console.log("send new message to all user OK!");
      }, 0)

      return {}
    } catch (error) {
      console.log(error);
      throw new Error('数据库操作异常，请稍后再试')
    }
  }
}

module.exports = messageService