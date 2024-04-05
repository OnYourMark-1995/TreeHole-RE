/**
 * 模拟缓存功能的工具类
 * 
 * 功能：记录最近1分钟之内接收到的新消息，接收到新消息时插入此数组
 * 最前面（并存入数据库），超过一分钟的会删除
 * */ 
class RecentUpdateDataList {
  constructor() {
    this.dataList = []
    // 最新信息到达时间（数组第一条数据的到达时间）
    this.lastReceiveTime = Date.now()
  }

  /**
   * 添加新消息，并更新dataList，将超时的消息删除
   * @param {*} updateData 刚接收到的新数据
   */
  update(updateData) {
    console.log('come in')

    // 将新信息 和 其到达数据库的时间 一起插入到数组最前面
    const curTime = Date.now()
    this.dataList.unshift({
      // 新消息到达服务器时间
      receiveServerTime: curTime,
      data: updateData
    })
    this.lastReceiveTime = curTime
    this.removeOverdueDate()
    
    console.log(this.dataList)
  }

  /**
   * 移除超时的消息，超时时间为 60000
   */
  removeOverdueDate() {
    // 获取当前时间
    const curTime = Date.now()
    for (let i = this.dataList.length - 1; i >= 0; i--) {
      if (curTime - this.dataList[i].receiveServerTime > 60000) {
        this.dataList.pop()
      } else {
        break;
      }
    }
    // this.dataList = this.dataList.filter(item => {
    //   return curTime - item.receiveServerTime < 60*1000
    // })
  }

  /**
   * 返回 时间curTime 以后更新的数据
   * @param {Date} curTime 
   * @returns 
   */
  getUpdate(curTime) {
    const list = this.dataList.filter(item => {
      return item.receiveServerTime > curTime
    })
    
    return list.map(item => item.data)
  }

}

module.exports = new RecentUpdateDataList();