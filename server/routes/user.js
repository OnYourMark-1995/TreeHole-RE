var express = require('express');
var router = express.Router();
const userService = require('../mvc/service/userService');
const checkTokenMiddleware = require('../middlewares/checkTokenMiddleware');

// 用户注册
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body

  try {
    const data = await userService.register({ username, email, password })
    res.json({
      code: 1001,
      message: "注册成功",
      data: data
    })
  } catch (error) {
    res.status(400)
    res.json({
      code: 4001,
      message: "注册失败，" + error.message,
      data: null
    })
  }
});

// 用户登录
router.post('/login', async (req, res) => {
  const { username, email, password } = req.body

  try{
    const data = await userService.login({ username, email, password })
    res.json({
      code: 1002,
      message: "登录成功",
      data: data
    })
  } catch (error) {
    res.status(400)
    res.json({
      code: 4002,
      message: "登录失败，" + error.message,
      data: null
    })
  }
})

// 用户退出登录
router.post('/loginout', (req, res) => {
  res.json({})
})

// 更新用户信息（更新头像在另一个路由/update/avatar中处理）
router.post('/update/info', checkTokenMiddleware, async (req, res) => {
  const { username, email, gender } = req.body
  try {
    await userService.updateInfo({ 
      // req.userJwt 来自 token 验证中间件中 jwt 解码后的结果
      userId: req.userJwt.userId, 
      username, 
      email, 
      gender
    })
    res.json({
      code: 1201,
      message: '用户信息更新成功',
      data: null
    })
  } catch (error) {
    res.json({
      code: 4201,
      message: error.message,
      data: null
    })
  }
})

const avatarImgUploadMiddleware = require('../middlewares/avatarImgUploadMiddleware');
router.post('/update/avatar', 
  checkTokenMiddleware,
  avatarImgUploadMiddleware, 
  async (req, res) => {
    try {
      /*  req.userJwt 来自 token 验证中间件中 jwt 解码后的结果，
          req.file 来自文件上传中间件，文件上传成功后，multer插件会在 req 中添加保存的文件信息 */
      await userService.updateAvatarImg(req.userJwt.userId, req.file.filename)
      res.json({
        code: 1202,
        message: '头像上传成功',
        data: null
      })
    } catch (error) {
      res.json({
        code: 4204,
        message: error.message,
        data: null
      })
    }
})

module.exports = router;
