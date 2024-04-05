var express = require('express');
var router = express.Router();
const userService = require('../mvc/service/userService');

// 用户注册
router.post('/register', async (req, res) => {
  const {username, email, password} = req.body

  try {
    const data = await userService.register({ username, email, password })
    res.json({
      code: "1001",
      messsage: "注册成功",
      data: data
    })
  } catch (error) {
    res.status(400)
    res.json({
      code: "4001",
      messsage: "注册失败，" + error.message,
      data: ''
    })
  }
});

// 用户登录
router.post('/login', async (req, res) => {
  const { username, email, password } = req.body

  try{
    const data = await userService.login({ username, email, password })
    res.json({
      code: '1002',
      messsage: "登录成功",
      data: data
    })
  } catch (error) {
    res.status(400)
    res.json({
      code: '4002',
      messsage: "登录失败，" + error.message,
      data: ''
    })
  }
})

// 用户退出登录
router.post('/loginout', (req, res) => {
  res.json({})
})

module.exports = router;
