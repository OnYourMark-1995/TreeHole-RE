const multer = require('multer');
const { AVATAR_IMG_FOLDER, AVATAR_IMG_MAX_SIZE, AVATAR_IMG_UPLOAD_FORM_NAME } = require('../config/avatarImgStorageConfig');
const { responseTool } = require('../utils/responseTool')

const storage = multer.diskStorage({
  // 头像图片保存位置
  destination: AVATAR_IMG_FOLDER,
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
  console.log('filter an avatarImg', file);
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
}).single(AVATAR_IMG_UPLOAD_FORM_NAME)

const avatarImgUpload = (req, res ,next) => {
  upload(req, res, (error) => {
    if(!req.file){
      responseTool.fail(res, [4204, "缺少头像图片文件，请上传头像图片"])
      return // 这里不要漏了return，否则会走下面的next()
    }
    
    if(error instanceof multer.MulterError) {
      //  捕捉 Multer 错误，使用 multer 对象下的 MulterError 类
      if(error.code === 'LIMIT_FILE_SIZE'){
        responseTool.fail(res, [4203, '头像上传失败，图片文件太大'])
        return // 这里不要漏了return，否则会走下面的next()
      }
      // TODO: 考虑发生 除文件太大以外 的情况，是否会发生，是否要处理？
    }else if (error) {
      // 发生其他错误
      responseTool.fail(res, [4204, error.message])
      return // 这里不要漏了return，否则会走下面的next()
    }

    console.log("middleware req return", req.file);
    // 无异常，调用next
    next()
  })
}

module.exports = avatarImgUpload