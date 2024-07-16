// const { nanoid } = require('nanoid')

// TODO: node自带的uuid生成函数效率较低，nanoid好像要es6才能用。id的生成尝试用循环令牌机制。
const { randomUUID } = require("crypto")
const { SSE_CONNECTION_EXPIRE_IN } = require("../config/sseConnectionConfig")

class SSEConnection {
  /**
   * 
   * @param {*} response SSE 连接的响应对象
   */
  constructor(response) {
    this.response = response
    this.id = randomUUID() // SSE 连接的 id

    response.set({
      'Content-Type':'text/event-stream',
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      "Access-Control-Allow-Origin": '*'
    })

    // close事件：表示响应已完成，或者其底层连接提前终止（在响应完成之前）。
    // http协议在未完成响应前 底层有 tcp连接，假如用户在响应未关闭前关闭页面，
    // 会使底层的连接终止，也会触发这个 close 事件。
    // PS.在虚拟机中访问页面，然后断开网络，发现断网不会触发该事件，可能是因为
    // 没有进行 tcp 4次挥手断开连接，导致服务器不知道断开了连接，因此使用定时器
    // 实现连接超时的逻辑是一定要做的。
    response.on('close', () => {
      clearTimeout(this.connectionTimeOutTimer)
    })

    // SSE 连接的超时计时器
    this.connectionTimeOutTimer = setTimeout(() => {
      console.log(`timeout, id=${this.id}`);
      // 设置重试间隔时间为 0，让前端在超时断开连接后立刻重连
      response.write(`retry: ${0}\n`)
      // 调用 end() 断开连接（会触发 close 事件），并发送超时事件。
      response.end(`event: connection-timeout\ndata: sse connect timeout, please retry\n\n`)
    }, SSE_CONNECTION_EXPIRE_IN)

    // 初始化 连接对象，设置 id，以及异常重连延时。
    response.write(`id: ${this.id}\n`)
    response.write(`retry: ${5*1000}\n\n`)
  }

  sendJson(data) {
    this.response.write(`data: ${JSON.stringify(data)}\n\n`)
  }

  /**
   * 手动断开连接
   */
  close() {
    // 调用 end() 断开连接（会触发 close 事件）。
    this.response.end()
  }

  /**
   * 重置 close 事件（初始化时，设置了默认的 close事件）
   * @param {*} callback 
   */
  onClose(callback) {
    // close事件：表示响应已完成，或者其底层连接提前终止（在响应完成之前）。
    // http协议在未完成响应前 底层有 tcp连接，假如用户在响应未关闭前关闭页面，
    // 或断开网络等情况，会使底层的连接终止，也会触发这个 close 事件。
    // PS.在虚拟机中访问页面，然后断开网络，发现断网不会触发该事件，可能是因为
    // 没有进行 tcp 4次挥手断开连接，导致服务器不知道断开了连接，因此使用定时器
    // 实现连接超时的逻辑是一定要做的。
    this.response.on('close', () => {
      clearTimeout(this.connectionTimeOutTimer)
      callback()
    })
  }
}

/**
 * 工具类，用于辅助 Server-Sent Events 连接的建立、发送数据、关闭连接。
 */
class SSETool {
  constructor() {
    /**
     * 保存所有 Server-Sent Events 连接的数据。
     */
    this.SSEConnectionMap = new Map()
  }

  /**
   * 添加 Server-Sent Events 连接
   * @param {*} request express框架 的 request 对象
   * @param {*} response express框架 的 response 对象
   */
  addConnection(request, response) {

    // 此处的变量名的sse为小写字母，防止和 类对象 SSEConnection 发生冲突。
    const sseConnection = new SSEConnection(response)

    // 当 连接关闭时，移除连接
    sseConnection.onClose(() => {
      this.removeConnection(sseConnection.id)
      console.log(`close an res, id=${sseConnection.id}, SSEConnectionMap.size=${this.SSEConnectionMap.size}`);
    })

    // 将 SSE连接 保存起来
    this.SSEConnectionMap.set(sseConnection.id, sseConnection)

    console.log(`new connect, id=${sseConnection.id}, SSEConnectionMap.size=${this.SSEConnectionMap.size}`);

    return sseConnection
  }

  /**
   * 向已保存的 Server-Sent Events 连接发送 Json 数据
   * @param {Object} data 待发送的数据
   */
  sendJsonToAllConnections(data) {
    this.SSEConnectionMap.forEach((sseConnection) => {
      sseConnection.sendJson(data)
    })
  }

  /**
   * 移除一个 SSE 连接
   * @param {*} id SSE连接的 id
   */
  removeConnection(id) {
    const sseConnection = this.SSEConnectionMap.get(id)
    sseConnection.close()
    this.SSEConnectionMap.delete(id)
  }
}

module.exports = new SSETool()