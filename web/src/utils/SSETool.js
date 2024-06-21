class SSETool {
  constructor(url) {
    this.source = new EventSource(url)
    this.init()
  }

  init() {
    this.on('open', (event) => {
      console.log("Server-Sent Events open")
    })

    this.on('error', (event) => {
      console.log("Server-Sent Events error")
      throw new Error("Server-Sent Events error")
    })
  }

  on (eventName, callback) {
    if(eventName == 'open'){
      this.source.onopen = callback
    }
    else if(eventName == 'message'){
      this.source.onmessage = callback
    }
    else if(eventName == 'error'){
      this.source.onerror = callback
    }
  }
}