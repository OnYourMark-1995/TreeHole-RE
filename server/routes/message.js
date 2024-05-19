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
router.post('/add', checkTokenMiddleware, async (req, res) => {
  const { content, date, userId } = req.body
  try {
    await messageService.add({ 
      content, 
      date: moment(date).format("YYYY-MM-DD HH:mm:ss"), 
      userId 
    })
    res.json({
      code: 2001,
      message: '消息发送成功',
      date: null
    })
  } catch (error) {
    res.status(400)
    res.json({
      code: 4101,
      message: error.message,
      date: null
    })
  }
})

module.exports = router;