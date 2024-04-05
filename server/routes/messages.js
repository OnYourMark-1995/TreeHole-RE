const express = require('express');
const router = express.Router();

const messageService = require('../mvc/service/messageService');

// 建立 sse 连接
router.get('/sse-connect', function(req, res, next) {
  messageService.sseConnect(res)
});

module.exports = router;