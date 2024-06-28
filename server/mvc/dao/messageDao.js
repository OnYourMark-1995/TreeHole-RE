const sqlExecuteTool = require('../../utils/sqlExecuteTool')

const messageDao = {

  /**
   * 根据 消息id 查询 1条 消息
   * @param {Number} messageId 消息id
   * @param {Number} userId 用户id，可选。如果传递了，会根据该用户id，查询该用户是否对消息点了赞
   * @returns 
   */
  getOneMessage: async (messageId, userId = null) => {
    const sql = "SELECT mt.message_id messageId, mt.content, mt.`date`, mt.like_count likeCount, ut.avatar_img avatarImg, ut.username, ldt.like_detail_id likeDetailId \
    FROM (SELECT * FROM message_table WHERE message_id = ?) mt \
    LEFT JOIN user_table ut ON mt.user_id = ut.user_id \
    LEFT JOIN like_detail_table ldt ON ldt.user_id = ? AND mt.message_id = ldt.message_id ;"

    const result = await sqlExecuteTool.sqlExecute(sql, [messageId, userId])
    return result[0]
  },

  /**
   * 获取message_id 小于 leastMessageId 的10条消息，并联表查询出消息发送者，还有用户id为userId的用户对这10条数据的点赞情况
   * @param {Number} leastMessageId 用户已收到的消息中，id最小的消息的id号
   * @param {Number} userId 用户id，默认值为null，即用户没有登陆时，不会传递用户id
   * @returns 
   */
  getMessageByLeastMessageId: async (leastMessageId, userId = null) => {
    const sqlGenerator = (condition) => {
      return `SELECT mt.message_id messageId, mt.content, mt.\`date\`, mt.like_count likeCount, ut.avatar_img avatarImg, ut.username, ldt.like_detail_id likeDetailId \
        FROM (SELECT * FROM message_table ${condition} ORDER BY message_id DESC LIMIT 10) mt \
        LEFT JOIN user_table ut on mt.user_id = ut.user_id \
        LEFT JOIN like_detail_table ldt ON ldt.user_id = ? AND mt.message_id = ldt.message_id ;`
    }

    if(!leastMessageId){
      const sql = sqlGenerator('')
      return await sqlExecuteTool.sqlExecute(sql, [userId])
    } else {
      const sql = sqlGenerator('WHERE message_id < ?')
      return await sqlExecuteTool.sqlExecute(sql, [leastMessageId, userId])
    }
  },

  /**
   * 根据 用户id 返回 10条 用户发送的消息
   * @param {Number} userId 用户id
   * @param {Number} leastMessageId 可选，用户已接收到的消息中最小的消息id。不传递该参数时，查询该用户的 前10条 数据
   * @returns 
   */
  getMessageByUserId: async (userId, leastMessageId = null) => {
    const sqlGenerator = (condition) => {
      return `SELECT mt.message_id messageId, mt.content, mt.\`date\`, mt.like_count likeCount, ut.avatar_img avatarImg, ut.username, ldt.like_detail_id likeDetailId \
      FROM (SELECT * FROM message_table ${condition} ORDER BY message_id DESC LIMIT 10) mt \
      LEFT JOIN user_table ut ON mt.user_id = ut.user_id \
      LEFT JOIN like_detail_table ldt ON ldt.user_id = ? AND mt.message_id = ldt.message_id ;`
    }

    if(!leastMessageId) {
      const sql = sqlGenerator('WHERE user_id = ?')
      return await sqlExecuteTool.sqlExecute(sql, [userId, userId])
    } else {
      const sql = sqlGenerator('WHERE user_id = ? AND message_id < ?')
      return await sqlExecuteTool.sqlExecute(sql, [userId, leastMessageId, userId])
    }
  },

  /**
   * 根据 用户id 获取 10条 用户点过赞的消息
   * @param {Number} userId 用户id
   * @param {Number} leastLikedId 用户已获取点过赞的消息的最小点赞id（注意：此处为点赞表的id，而不是消息表的id）。当不传递该参数时，返回 前10条
   * @returns 
   */
  getLikedMessageByUserId: async (userId, leastLikeDetailId = null) => {
    const sqlGenerator = (condition) => {
      return `SELECT mt.message_id messageId, mt.content, mt.\`date\`, mt.like_count likeCount, ut.avatar_img avatarImg, ut.username, ldt.like_detail_id likeDetailId \
      FROM ( SELECT * FROM like_detail_table ${condition} ORDER BY like_detail_id DESC LIMIT 10 ) ldt \
      LEFT JOIN message_table mt ON mt.message_id = ldt.message_id \
      LEFT JOIN user_table ut ON ut.user_id = ldt.user_id ;`
    }

    if(!leastLikeDetailId){
      const sql = sqlGenerator('WHERE user_id = ?')
      return await sqlExecuteTool.sqlExecute(sql, [userId])
    } else {
      const sql = sqlGenerator('WHERE user_id = ? AND like_detail_id < ?')
      return await sqlExecuteTool.sqlExecute(sql, [userId, leastLikeDetailId])
    }
  },

  /**
   * 插入一条新消息
   * @param {String} content 消息内容主体
   * @param {Date} date 发表时间
   * @param {Number} userId 用户id
   * @returns 
   */
  insertMessage: async (content, date, userId) => {
    const sql = 'INSERT INTO message_table (content, `date`, user_id) \
      VALUES (?, ?, ?);'

    const results = await sqlExecuteTool.sqlExecute(sql, [content, date, userId ])
    return results
  },
}

module.exports = messageDao