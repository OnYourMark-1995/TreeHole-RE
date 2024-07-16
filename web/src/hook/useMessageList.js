import { inject, ref } from "vue"

// 复用 获取数据 的逻辑
export default (leastKeyName, requestMessageApi) => {

  const messageList = ref([])
  let leastKey = -1
  let hasMoreMessage = true

  const NotifyEl = inject('NotifyEl')

  const getMoreMessages = async () => {
    if(!hasMoreMessage){
      NotifyEl.value.warning('已获取所有消息，没有更多消息了')
      return 
    } 

    try {
      const { data } = await requestMessageApi(leastKey)

      hasMoreMessage = data.hasMoreMessage

      if(data.messageList.length > 0) {
        leastKey = data.messageList.at(-1)[leastKeyName]
        // let promise = Promise.resolve()
        
        // for(const message of data.messageList){
        //   promise = promise.then(() => {
        //     return new Promise((resolve) => {
        //       setTimeout(() => {
        //         messageList.value.push(message)
        //         resolve()
        //       },50)
        //     })
        //   })
        // }
        messageList.value.push(...data.messageList)
      }

    } catch (axiosError) {
      console.log(axiosError);
      if(axiosError.code === 'ERR_NETWORK'){
        NotifyEl.value.error("您的网络连接异常，请稍后再试！")
      } else if(axiosError?.response){
        const { data } = axiosError.response
        NotifyEl.value.error(data.message)
      }
    }
  }

  return { messageList, getMoreMessages }
}