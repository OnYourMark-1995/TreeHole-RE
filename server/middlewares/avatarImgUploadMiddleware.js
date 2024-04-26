const multer = require('multer');
const { AVATAR_IMG_FLODER, AVATAR_IMG_MAX_SIZE } = require('../config/avatarImgStorageConfig');

const storage = multer.diskStorage({
  // 头像图片保存位置
  destination: AVATAR_IMG_FLODER,
  // 头像图片保存文件名
  filename: function (req, file, cb) {
    console.log('storage filename', file);
    // 获取文件后缀
    const suffix = file.originalname.substring(file.originalname.lastIndexOf("."));
    // 文件名格式 -> avatarImg-用户id-时间戳.文件后缀，用户id从用户返回的jwt中获取
    cb(null, `${file.fieldname}-${req.userJwt.userId}-${Date.now()}${suffix}`)
  }
})

// fileFilter 会对接收到的 每个文件 进行过滤处理
const fileFilter = (req, file, cb) => {
  console.log('filter', file);
  const mimetypeRegExp = new RegExp('^image\/(jpg|jpeg|png){1}', 'i')
  if(!mimetypeRegExp.test(file.mimetype)){
    // 图片文件不符合要求，抛出错误，并拒绝该文件
    cb(new Error('图片类型不符合要求，只接收jpg、jpeg、png格式的图片'), false)
  } else {
    // 接受这个文件，使用`true`
    cb(null, true)
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: AVATAR_IMG_MAX_SIZE,
  },
  fileFilter: fileFilter,
}).single('avatarImg')

const avatarImgUpload = (req, res ,next) => {
  upload(req, res, (error) => {
    if(!req.file){
      res.json({
        code: 4202,
        message: "缺少头像图片文件，请上传头像图片",
        data: null
      })
      return // 这里不要漏了return，否则会走下面的next()
    }
    
    if(error instanceof multer.MulterError) {
      //  捕捉 Multer 错误，使用 multer 对象下的 MulterError 类
      if(error.code === 'LIMIT_FILE_SIZE'){
        res.status(400)
        res.json({
          code: 4203,
          message: '头像上传失败，图片文件太大',
          data: null
        })
        return // 这里不要漏了return，否则会走下面的next()
      }
    }else if (error) {
      // 发生其他错误
      res.status(400)
      res.json({
        code: 4204,
        message: error.message,
        data: null
      })
      return // 这里不要漏了return，否则会走下面的next()
    }
    console.log("middleware req return", req.file);
    // 无异常，调用next
    next()
  })
}

module.exports = avatarImgUpload