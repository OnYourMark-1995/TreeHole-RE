export default class SSETool {
  constructor(url) {
    this.source = new EventSource(url)
    this.source.onopen = (event) => {
      console.log("Server-Sent Events open")
    }
    this.source.onerror = (event) => {
      throw new Error("Server-Sent Events error")
    }
  }
 
  onJsonMessage(callback) {
    this.source.onmessage = (event) => {
      let data = JSON.parse(event.data)
      callback(data)
    }
  }

  onError(callback) {
    this.source.onerror = (event) => {
      callback()
    }
  }
}