export default class SSETool {
  constructor(url) {
    this.source = new EventSource(url)
    /*     
      与服务器的 SSE 连接，在一段时间后连接超时，后端会主动断开连接，这是
      为了防止前端因网络问题或其他异常，导致后端一直保存着连接，浪费资源。
      浏览器的机制是 EventSource实例 的 readyState属性 不为close时会自动
      重连，所以后端断开连接后前端浏览器自动重连即可。
      PS.只有手动调用 EventSource实例的 close()方法 才会使 readyState属性 
      变为 close，才不会重连。
    */    
    this.isTimeoutRetry = false // 是否为超时尝试。如果是，则不是异常情况，不调用 error 事件
    this.retryConnectNum = 0 // 连接重试次数

    this.source.onopen = (event) => {
      this.isTimeoutRetry = false
      this.retryConnectNum = 0
      console.log("Server-Sent Events open")
    }

    // 默认 error 事件
    this.onError(() => {
      if(this.isTimeoutRetry) {
        this.isTimeoutRetry = false
      }
      throw new Error("Server-Sent Events error")
    })

    // 连接超时的事件（自定义的 SSE 事件，默认的事件只有 message ，自定义事件由服务器设置）
    this.source.addEventListener('connection-timeout', (event) => {
      console.log(event.data);
      this.isTimeoutRetry = true
    })

    // 在应用关闭前，断开 SSE 连接
    window.addEventListener('beforeunload', () => {
      this.source.close()
    })
  }
 
  onJsonMessage(callback) {
    this.source.onmessage = (event) => {
      let data = JSON.parse(event.data)
      callback(data)
    }
  }

  onError(callback) {
    this.source.onerror = (event) => {
      // 如果是连接超时异常，则不做异常处理。由浏览器自动发起重连即可。
      if(this.isTimeoutRetry) {
        this.isTimeoutRetry = false
        return
      }

      this.retryConnectNum ++
      console.log(`SSE 重连尝试 ${this.retryConnectNum}/10`);

      // 重试次数超过 10 次断开连接。
      if(this.retryConnectNum === 10) {
        console.log('SSE 重连尝试失败');
        this.source.close()
      }

      callback?.()
    }
  }
}