const mysqlPool = require("../database/mysqlPool");

class SqlExecuteTool {

  constructor (mysqlPool) {
    this.mysqlPool = mysqlPool
    this.mysqlConnection = null
  }

  /**
   * 获取数据库连接，赋值给 this.mysqlConnection，并返回
   * @returns 
   */
  async getConnection() {
    try {
      this.mysqlConnection = await this.mysqlPool.getConnection()
      return this.mysqlConnection
    } catch (error) {
      console.log("数据库获取连接失败！请检查数据库配置是否出错，并检查sqlExecuteTool.js文件是否有Bug。");
      console.log(error);
      throw error
    }
  }

  /**
   * 释放连接回连接池
   * @returns 
   */
  connectRelease () {
    if(this.mysqlConnection == null) return

    this.mysqlConnection.release()
    this.mysqlConnection = null
  }

  /**
   * 执行 sql 语句
   * @param {String} sql sql语句
   * @param {Array} paramArray 
   * @returns sql 语句执行结果
   */
  async sqlExecute (sql, paramArray) {
    // 漏掉这个 await 害我测试了好久。。。
    // 这里的异步操作如果没有await，下一个trycatch中的this.mysqlConnection没有值
    await this.getConnection()

    try {
      const [results, field] = await this.mysqlConnection.execute(sql, paramArray)
      return results
    } catch (error) {
      console.log("数据库操作异常！请检查sqlExecute()调用是否有问题。");
      console.log(error);
      throw error
    } finally {
      this.connectRelease()
    }
  }
}

module.exports = new SqlExecuteTool(mysqlPool)