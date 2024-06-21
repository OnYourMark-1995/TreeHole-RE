<script setup>
import MessageCardList from '../../components/MessageCardList.vue';
import MessageEditor from './MessageEditor.vue';
import MyButton from '../../components/common/MyButton.vue';
import { onMounted, ref } from 'vue';
import messageApi from '../../api/messageApi';

import requestConfig from '../../config/request-config';

defineOptions({
  name: 'Home'
})

const messageList = ref([])
let leastMessageId = -1
let hasMoreMessage = true

const getMoreMessages = async () => {
  if(!hasMoreMessage){
    return window.alert("已获取所有消息，没有更多消息了")
  } 

  try {
    const result = await messageApi.getMessage(leastMessageId)
    const { data } = result.data

    messageList.value.push(...data.messageList)

    leastMessageId = data.messageList.at(-1).messageId
    hasMoreMessage = data.hasMoreMessage

  } catch (axiosError) {

    console.log(axiosError);
    if(axiosError.code === 'ERR_NETWORK'){
      window.alert("您的网络连接异常，请稍后再试！")
    } else {
      const { data } = axiosError.response
      window.alert(data.message)
    }
  }
}

const SSEConnect = new EventSource(`${requestConfig.BASE_URL}/message/sse-connect`)

SSEConnect.onopen = (event) => {
  console.log("Server-Sent Events open", event)
}

SSEConnect.onmessage = (event) => {
  console.log("Server-Sent Events message", event.data)
}

SSEConnect.onerror = (event) => {
  console.log(event)
  throw new Error('Server-Sent Events error !')
}

onMounted(() => {
  getMoreMessages()
})
</script>

<template>
  <MessageEditor />

  <MessageCardList :message-list="messageList"/>

  <div class="get-message-button-wrap">
    <MyButton 
      @click="getMoreMessages" 
      width="80%"
    >点击获取更多</MyButton>
  </div>
    
</template>

<style scoped>
.get-message-button-wrap{
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}
</style>