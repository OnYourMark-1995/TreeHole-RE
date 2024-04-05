module.exports = {
  host: "127.0.0.1", // 主机地址
  user: "root", // 用户名
  password: "123456", // 密码
  port: 3306, // 端口号，默认为 3306
  database: "tree-hole", // 数据库名称
  waitForConnections: true,
  connectionLimit: 4,
  // maxIdle: 4, // max idle connections, the default value is the same as `connectionLimit`
  // idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  // queueLimit: 0, // 排队等待连接的最大请求数，0表示无限制，默认值：0
  // enableKeepAlive: true,
  // keepAliveInitialDelay: 0, // 当连接池达到最大连接数时，是否等待可用连接
}