const sqlExecuteTool = require('../../utils/sqlExecuteTool')

const messageDao = {

  /**
   * 获取 最新的 10 条消息
   * @param {Number} userId 
   * @returns 
   */
  getFirstTenMessage: async (userId = null) => {
    const sql = "SELECT mt.message_id messageId, mt.content, mt.`date`, mt.like_count likeCount, ut.avatar_img avatarImg, ut.username, ldt.like_detail_id likeDetailId \
    FROM (SELECT * FROM message_table ORDER BY message_id DESC LIMIT 10) mt \
    LEFT JOIN user_table ut ON mt.user_id = ut.user_id \
    LEFT JOIN like_detail_table ldt ON ldt.user_id = ? AND mt.message_id = ldt.message_id ;"

    const results = await sqlExecuteTool.sqlExecute(sql, [userId])
    return results
  },

  /**
   * 获取message_id 小于 leastMessageId 的10条消息，并联表查询出消息发送者，还有用户id为userId的用户对这10条数据的点赞情况
   * @param {Number} leastMessageId 用户已收到的消息中，id最小的消息的id号
   * @param {Number} userId 用户id，默认值为null，即用户没有登陆时，不会传递用户id
   * @returns 
   */
  getMessageByLeastId: async (leastMessageId, userId = null) => {
    const sql = "SELECT mt.message_id messageId, mt.content, mt.`date`, mt.like_count likeCount, ut.avatar_img avatarImg, ut.username, ldt.like_detail_id likeDetailId \
    FROM (SELECT * FROM message_table WHERE message_id < ? ORDER BY message_id DESC LIMIT 10) mt \
    LEFT JOIN user_table ut on mt.user_id = ut.user_id \
    LEFT JOIN like_detail_table ldt ON ldt.user_id = ? AND mt.message_id = ldt.message_id ;"

    const results = await sqlExecuteTool.sqlExecute(sql, [leastMessageId, userId])
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