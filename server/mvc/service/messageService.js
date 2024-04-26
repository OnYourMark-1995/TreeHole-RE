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
      throw new Error('数据库操作异常，请稍后再试')
    }
  }
}

module.exports = messageService