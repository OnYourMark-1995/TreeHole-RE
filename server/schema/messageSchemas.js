const Joi = require("joi")

const messageSchemas = {

  add: Joi.object({
    // 消息内容主体
    content: Joi.string().required().trim(),
    date: Joi.date().required(),
    userId: Joi.number().required(),
  }),

}

module.exports = messageSchemas