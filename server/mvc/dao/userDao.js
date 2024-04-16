const { default_avatar_img } = require("../../config/userConfig");
const sqlExecuteTool = require("../../utils/sqlExecuteTool");

const userDao = {

	/**
	 * 根据 用户名 和 密码 查找用户
	 * @param {String} username 
	 * @param {String} password 
	 * @returns 
	 */
	selectUserByUsernameAndPassword: async (username, password) => {
		const sql = "SELECT user_id as userId, username, email FROM user_table \
      WHERE username = ? AND password = ? ;"

		const results = await sqlExecuteTool.sqlExecute(sql, [username, password])
		return results
	},

	/**
	 * 根据 邮箱 和 密码查找用户
	 * @param {String} email 
	 * @param {String} password 
	 * @returns 
	 */
	 selectUserByEmailAndPassword: async (email, password) => {
		const sql = "SELECT user_id as userId, username, email FROM user_table \
      WHERE email = ? AND password = ? ;"

		const results = await sqlExecuteTool.sqlExecute(sql, [email, password])
		return results
	},

	/**
	 * 根据 username 或 email 查找是否存在 用户
	 * @param {String} username 
	 * @param {String} email 
	 * @returns 
	 */
  selectUserIdByUsernameOrEmail: async (username, email) => {
		const sql = "SELECT user_id as userId, username, email FROM user_table \
      WHERE username = ? OR email = ? ;"

		const results = await sqlExecuteTool.sqlExecute(sql, [username, email])
		return results
	},

	/**
	 * 添加新的用户
	 * @param {Object} user 包含username, password, email, avatarImg 的用户对象
	 * @returns 
	 */
	insertUser: async (user) => {
		const sql = "INSERT INTO user_table (username, `password`, email, avatar_img) \
      VALUES (?, ?, ?, ?);"

		if (!user.avatarImg) {
			user.avatarImg = default_avatar_img
		}

		// 插入操作的返回值 result 如下：
		// ResultSetHeader { fieldCount: 0, affectedRows: 1, insertId: 6, info: '', serverStatus: 2, warningStatus: 0, changedRows: 0 }
		const results = await sqlExecuteTool.sqlExecute(sql, [
			user.username,
			user.password,
			user.email,
			user.avatarImg
		])

		// 返回插入数据的回显
		return {
			...user,
			userId: results.insertId
		}

	},

	/**
	 * 更新用户信息
	 * @param {Object} user 更新后的用户信息
	 */
	updateUser: async (user) => {

	},

	/**
	 * 根据 用户id 删除用户
	 * @param {Number} userId 
	 * @returns 
	 */
	deleteUserById: async (userId) => {
		const sql = "DELETE FROM user_table WHERE user_id = ?;"

		const results = await sqlExecuteTool.sqlExecute(sql, [userId])
		return results
	},
}

module.exports = userDao