const url = require('url')
const { AVATAR_IMG_URL_PREFIX } = require("../../config/avatarImgStorageConfig")
const messageSchemas = require("../../schema/messageSchemas")
const messageDao = require("../dao/messageDao")

// 模拟缓存功能的工具类
// const recentUpdateDataList = require('utils/RecentUpdateList')

const messageService = {

  /**
   * 建立 sse 连接
   * @param {Response} res http响应对象
   */
  // sseConnect: ( res ) => {
  //   res.set({
  //     'Content-Type':'text/event-stream',
  //     "Cache-Control": "no-cache",
  //     "Connection": "keep-alive",
  //     "Access-Control-Allow-Origin": '*'
  //   })
  
  //   res.write(`data:{"code": "1002", "message": "connect success"}\n\n`)
  
  //   let lastUpdateTime = Date.now()
  
  //   let $timer = setInterval(() => {
  //     console.log('time in')
  //     if(lastUpdateTime < recentUpdateDataList.lastReceiveTime){
  //       return
  //     }
  
  //     const resJson = {
  //       code: '1003',
  //       data: recentUpdateDataList.getUpdate(lastUpdateTime)
  //     }
  //     console.log('send to Broser')
  //     lastUpdateTime = Date.now()
  //     res.write( `data: ${JSON.stringify(resJson)}\n\n` )
  //   }, 2 * 1000);
   
   
  //   res.on('close', () => {
  //     clearInterval( $timer )
  //   })
  // },

  sseConnect: ( res ) => {
    res.set({
      'Content-Type':'text/event-stream',
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      "Access-Control-Allow-Origin": '*'
    })
  
    res.write(`data:{"code": "1002", "message": "connect success"}\n\n`)
    
    res.on('close', () => {
      console.log("a sse connection closed !");
    })
  },

  getMessage: async (leastMessageId, userId = null) => {
    let messageList = [] // 保存 数据库中查询到的消息数据
    let hasMoreMessage = true // 是否还有更多的数据

    try {
      // leastMessageId 为 -1 时，返回最新的 10条 数据；大于 0 时，根据 leastMessageId 返回数据
      if(leastMessageId == -1) {
        messageList = await messageDao.getFirstTenMessage(userId)
      } 
      else if( leastMessageId >= 0){
        messageList = await messageDao.getMessageByLeastId(leastMessageId, userId)
      }

      // 查询到的消息不满 10 条，说明后面没有更多的数据了，用户已经获取了所有的消息
      if(messageList.length < 10) {
        hasMoreMessage = false
      }
      messageList.forEach((message) => {
        message.avatarImg = url.resolve(AVATAR_IMG_URL_PREFIX, message.avatarImg)
      })

      return {
        messageList,
        hasMoreMessage
      }
    } catch (error) {
      console.log(error);
      throw new Error("数据库操作异常，请稍后再试")
    }
  },

  /**
   * 添加一条新的消息
   * @param {Object} message 待插入的新消息
   */
  add: async ( message ) => {
    const { value, error } = messageSchemas.add.validate(message)
    if(error) throw Error('参数校验不通过')

    try {
      await messageDao.insertMessage(message.content, message.date, message.userId)
      return {}
    } catch (error) {
      console.log(error);
      throw new Error('数据库操作异常，请稍后再试')
    }
  }
}

module.exports = messageService