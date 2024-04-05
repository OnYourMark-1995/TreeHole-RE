const sqlExecuteTool = require('../../utils/sqlExecuteTool')

const messageDao = {
  /**
   * 获取 size条 信息
   * @param {Number} size 获取的消息数
   * @param {Number} userId 用户id
   * @returns 
   */
  selectMessageByPage: async (size, userId) => {

    // 错误的sql，没有分页
    const sql = "select mt.message_id, mt.content, like_detail_id \
      from message_table mt \
      left join user_table ut on mt.user_id = ut.user_id \
      left join like_detail_table ldt on ldt.user_id= ? and mt.message_id = ldt.message_id;"

    const results = await sqlExecuteTool.sqlExecute(sql, [userId])
    return results
  },

  /**
   * 插入一条新消息
   * @param {String} content 消息内容主体
   * @param {Date} date 发表时间
   * @param {Number} userId 用户id
   * @returns 
   */
  insertMessage: async (content, date, userId) => {
    const sql = 'insert into message_table (content, `date`, user_id) \
      values (?, ?, ?);'

    const results = await sqlExecuteTool.sqlExecute(sql, [content, date, userId ])
    return results
  },
}

module.exports = messageDao