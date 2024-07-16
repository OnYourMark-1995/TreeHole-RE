const express = require('express');
const router = express.Router();

const messageService = require('../mvc/service/messageService');
const checkTokenMiddleware = require('../middlewares/checkTokenMiddleware');
const moment = require('moment');
const { responseTool } = require('../utils/responseTool');

// 建立 sse 连接
router.get('/sse/connect', function(req, res) {
  messageService.sseConnect(req, res)
});

// TODO: 这个 api 似乎没有必要使用，所以暂时没有使用。
// 关闭 sse 连接
router.get('/sse/close/:lastEventId', function(req, res) {
  const lastEventId = req.params['lastEventId']
  messageService.sseClose(lastEventId)

  responseTool.success(res, [2007, 'SSE 连接断开'])
});

// 添加一条新消息，需要 token
router.post('/add', checkTokenMiddleware(true), async (req, res) => {
  const { content, date } = req.body
  const userId = req.userJwt.userId
  try {
    await messageService.addMessage({ 
      content, 
      date: moment(date).format("YYYY-MM-DD HH:mm:ss"), 
      userId 
    })
    
    console.log("add message OK");
    responseTool.success(res, [2001, '消息发送成功', null])
  } catch (error) {
    responseTool.fail(res, [4101, error.message, null])
  }
})

// 获取消息，用户id 从 token 中获取，用户不登陆也可以获得消息，所以 checkTokenMiddleware中间件在无 token 的情况也放行，而不是阻拦
router.get('/get-message/:leastMessageId', checkTokenMiddleware(false), async (req, res) => {
  const { leastMessageId } = req.params

  try {
    let data
    // 用户没有登陆的情况
    if(req.userJwt == null){
      data = await messageService.getMessage(leastMessageId)
    } else {
      data = await messageService.getMessage(leastMessageId, req.userJwt.userId)
    }

    responseTool.success(res, [2002, "获取数据成功", data])
  } catch (error) {
    responseTool.fail(res, [4102, error.message])
  }
})

// 用户获取自己发送过的消息数据。
// 考虑是否改为get请求，类似 router.get('/get-message/:leastMessageId' 的接口
router.post('/get-message/user/sended', checkTokenMiddleware(true), async (req, res) => {
  const { leastMessageId } = req.body
  const { userId } = req.userJwt

  try {
    const data = await messageService.getMessageByUser(userId, leastMessageId)
    responseTool.success(res, [2005, "获取用户发送的消息数据，成功", data])
  } catch (error) {
    responseTool.fail(res, [4103, error.message])
  }
})

router.post('/get-message/user/liked', checkTokenMiddleware(true), async (req, res) => {
  const { leastLikeDetailId } = req.body
  const { userId } = req.userJwt

  try {
    const data = await messageService.getUserLikedMessage(userId, leastLikeDetailId)
    responseTool.success(res, [2006, "获取用户点过赞的消息数据，成功", data])
  } catch (error) {
    responseTool.fail(res, [4104, error.message])
  }
})

// 点赞
router.post('/like/add', checkTokenMiddleware(true), (req, res) => {

})

// 取消点赞
router.post('/like/remove', checkTokenMiddleware(true), (req, res) => {

})

module.exports = router;