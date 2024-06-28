/**
 * 工具类，用于辅助 Server-Sent Events 连接的建立、发送数据、关闭连接。
 */
class SSETool {
  constructor() {
    /**
     * 保存所有 Server-Sent Events 连接的响应对象response 的数组。
     */
    this.connectedResponseList = []
  }

  /**
   * 添加 Server-Sent Events 连接
   * @param {*} response express框架 的 response 对象
   */
  addConnection(response) {
    // 设置 Server-Sent Events 所需要的响应头
    response.set({
      'Content-Type':'text/event-stream',
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      "Access-Control-Allow-Origin": '*'
    })
    
    // 将 Express框架的 response 对象保存起来
    this.connectedResponseList.push(response)

    // 当 连接关闭时，从数组从删除连接
    response.on('close', () => {
      this.closeConnection(response)
    })
  }

  /**
   * 向已保存的 Server-Sent Events 连接发送 Json 数据
   * @param {Object} data 待发送的数据
   */
  sendJsonToAllConnections(data) {
    this.connectedResponseList.forEach((connectedResponse) => {
      this.sendJsonToConnection(connectedResponse, data)
    })
  }

  /**
   * 向某个 Server-Sent Events 连接发送 Json 数据
   * @param {*} response Express框架的response对象，数据的发送目标
   * @param {*} data 待发送的数据
   */
  sendJsonToConnection(response, data) {
    response.write(`data: ${JSON.stringify(data)}\n\n`)
  }

  /**
   * 
   * @param {*} response Express框架的response对象，待关闭的连接的 response 对象
   */
  closeConnection(response) {
    this.connectedResponseList = this.connectedResponseList.filter((connectedResponse) => {
      return connectedResponse != response
    })
  }
}

module.exports = new SSETool()