const mysql = require("mysql2/promise")
const mysqlConfig = require("../config/mysqlConfig")

const mysqlPool = mysql.createPool({
  host: mysqlConfig.host, 
  user: mysqlConfig.user, 
  password: mysqlConfig.password, 
  port: mysqlConfig.port, 
  database: mysqlConfig.database, 
  waitForConnections: mysqlConfig.waitForConnections, 
  connectionLimit: mysqlConfig.connectionLimit, 
})

module.exports = mysqlPool