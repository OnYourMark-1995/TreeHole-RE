var express = require('express');
var router = express.Router();
const userService = require('../mvc/service/userService');
const checkTokenMiddleware = require('../middlewares/checkTokenMiddleware');
const { responseTool } = require('../utils/responseTool')

// 用户注册
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body

  try {
    const data = await userService.register({ username, email, password })
    
    responseTool.success(res, [1001, "注册成功", data])
  } catch (error) {
    responseTool.fail(res, [4001, "注册失败，" + error.message])
  }
});

// 用户登录
router.post('/login', async (req, res) => {
  const { username, email, password } = req.body

  try{
    const data = await userService.login({ username, email, password })
    
    responseTool.success(res, [1002, "登录成功", data])
  } catch (error) {
    responseTool.fail(res, [4002, "登录失败，" + error.message])
  }
})

// 用户退出登录
router.post('/logout', (req, res) => {
  res.json({})
})

// 更新用户信息（更新头像在另一个路由/update/avatar中处理）
router.post('/update/info', checkTokenMiddleware(true), async (req, res) => {
  const { username, email, gender } = req.body
  try {
    const data = await userService.updateInfo({ 
      // req.userJwt 来自 token 验证中间件中 jwt 解码后的结果
      userId: req.userJwt.userId, 
      username, 
      email, 
      gender
    })

    responseTool.success(res, [1201, '用户信息更新成功', data])
    
  } catch (error) {
    responseTool.fail(res, [4201, error.message])
  }
})

const avatarImgUploadMiddleware = require('../middlewares/avatarImgUploadMiddleware');

router.post('/update/avatar', 
  checkTokenMiddleware(true),
  avatarImgUploadMiddleware, 
  async (req, res) => {
    try {
      /*  req.userJwt 来自 token 验证中间件中 jwt 解码后的结果，
          req.file 来自文件上传中间件，文件上传成功后，multer插件会在 req 中添加保存的文件信息 */
      const data = await userService.updateAvatarImg(req.userJwt.userId, req.file.filename)
      
      responseTool.success(res, [1202, '头像更新成功', data])
    } catch (error) {
      responseTool.fail(res, [4204, error.message])
    }
})

module.exports = router;
