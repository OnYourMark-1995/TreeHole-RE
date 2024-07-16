// 有关头像图片文件上传的设置，需要与后端保持一致。

// 头像图片文件 的 最大体积，单位为 字节
export const AVATAR_IMG_MAX_SIZE = 1024*1024 

// 头像图片文件 的 最大体积，单位为 MB
export const AVATAR_IMG_MAX_SIZE_MB = `${AVATAR_IMG_MAX_SIZE/(1024*1024)}MB`

// 头像文件 上传时 指定的 表单名
export const AVATAR_IMG_UPLOAD_FORM_NAME = 'avatarImg'