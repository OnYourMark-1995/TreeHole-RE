const express = require('express');
const router = express.Router();

const messageService = require('../mvc/service/messageService');
const checkTokenMiddleware = require('../middlewares/checkTokenMiddleware');
const moment = require('moment');

// 建立 sse 连接
router.get('/sse-connect', function(req, res) {
  messageService.sseConnect(res)
});

// 添加一条新消息，需要 token
router.post('/add', checkTokenMiddleware(true), async (req, res) => {
  const { content, date } = req.body
  const userId = req.userJwt.userId
  try {
    await messageService.add({ 
      content, 
      date: moment(date).format("YYYY-MM-DD HH:mm:ss"), 
      userId 
    })
    res.json({
      code: 2001,
      message: '消息发送成功',
      data: null
    })
  } catch (error) {
    res.status(400)
    res.json({
      code: 4101,
      message: error.message,
      data: null
    })
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
    res.json({
      code: 200,
      message: "获取数据成功",
      data: data
    })
  } catch (error) {
    res.status(400)
    res.json({
      code: 4102,
      message: error.message,
      data: null
    })
  }
})

// 点赞
router.post('/like/add', checkTokenMiddleware(true), (req, res) => {

})

// 取消点赞
router.post('/like/remove', checkTokenMiddleware(true), (req, res) => {

})

module.exports = router;