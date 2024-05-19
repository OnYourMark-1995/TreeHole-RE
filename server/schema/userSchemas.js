const Joi = require("joi")

const userSchemas = {

  register: Joi.object({
    //用户名正则，1到30位（字母，数字，下划线，减号）
    username: Joi.string().max(30).required().pattern(new RegExp('^[\\u4e00-\\u9fa5a-zA-Z0-9_-]{1,30}$')),
    // 密码位数 6 到 30
    password: Joi.string().min(6).max(30).required(),
    email: Joi.string().email().required(),
  }),

  login: Joi.object({
    username: Joi.string().pattern(new RegExp('^[\\u4e00-\\u9fa5a-zA-Z0-9_-]{1,30}$')),
    email: Joi.string().email(),
    password: Joi.string().required(),

    // xor 中的键只需要其中之一，即 username 和 email 必须传递其中一个，且只能有一个
  }).xor('username', 'email'),

  updateInfo: Joi.object({
    userId: Joi.number().required(),
    //用户名正则，1到30位（字母，数字，下划线，减号）
    username: Joi.string().required().max(30).pattern(new RegExp('^[\\u4e00-\\u9fa5a-zA-Z0-9_-]{1,30}$')),
    email: Joi.string().email().required(),
    gender: Joi.string().valid('man', 'woman', 'secret').required()
  })
}

module.exports = userSchemas