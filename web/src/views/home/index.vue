<script setup>
import MessageCardList from '../../components/MessageCardList.vue';
import MessageEditor from './MessageEditor.vue';
import MessageGettingButton from '../../components/MessageGettingButton.vue';

import { inject, onMounted } from 'vue';
import messageApi from '../../api/messageApi';

import { SSE_CONNECTION_URL } from '../../config/request-config';
import SSETool from '../../utils/SSETool';

import useMessageList from '../../hook/useMessageList';

defineOptions({
  name: 'Home'
})

const NotifyEl = inject('NotifyEl')

/* const messageList = ref([])
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
} */

const { messageList, getMoreMessages } = useMessageList('messageId', messageApi.getMessage)

onMounted(async () => {
  await getMoreMessages()

  // 建立 Server-Sent Events 连接
  const SSEConnect = new SSETool(SSE_CONNECTION_URL)

  SSEConnect.onJsonMessage((result) => {
    console.log("get sse message", result);
    if(result.code == 2004){
      messageList.value.unshift(result.data)
    }
  })

  SSEConnect.onError(() => {
    NotifyEl.value.error('网络连接状态异常')
  })
})
</script>

<template>
  <MessageEditor />

  <MessageCardList :message-list="messageList"/>

  <MessageGettingButton @click="getMoreMessages"/>
  
</template>