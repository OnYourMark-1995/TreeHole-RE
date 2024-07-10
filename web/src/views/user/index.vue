<script setup>
import UserCard from './UserCard.vue';
import MessageCardList from '../../components/MessageCardList.vue';
import MessageGettingButton from '../../components/MessageGettingButton.vue';
import { computed, onMounted, reactive, ref } from 'vue';
import useUserStore from '../../store/useUserStore';
import useMessageList from '../../hook/useMessageList';
import messageApi from '../../api/messageApi';

defineOptions({
  name: 'User'
})

const userStore = useUserStore()

const userInfo = computed(() => {
  return userStore.userInfo
})

const sendedMessageInfo = useMessageList('messageId', messageApi.getUserSendedMessage)

const likedMessageInfo = useMessageList('likeDetailId', messageApi.getUserLikedMessage)

let curMessageInfo = reactive(sendedMessageInfo)

// 键为状态名，值为对应的 消息列表。
// 当 menuModel 的值为 ‘sended-message’ 时，展示 sendedMessageInfo 的消息列表
const modelMap = {
  'sended-message': sendedMessageInfo ,
  'liked-message': likedMessageInfo 
}

const menuModel = ref('sended-message')

const menuModelChange = (newValue) => {
  curMessageInfo = reactive(modelMap[newValue])
}

onMounted(() => {
  sendedMessageInfo.getMoreMessages()
  likedMessageInfo.getMoreMessages()
})
</script>

<template>
  <UserCard :user-info="userInfo" v-model:menu="menuModel" @menu-model-change="menuModelChange"/>

  <div class="message-wrap">
    <div v-if="curMessageInfo.messageList.length > 0" class="message-exist-wrap">
      <MessageCardList :message-list="curMessageInfo.messageList" />
      <MessageGettingButton @click="curMessageInfo.getMoreMessages" />
    </div>
    
    <div v-else class="message-empty-wrap">
      <p v-if="menuModel == 'sended-message'">你还没有发表过任何消息</p>
      <p v-else-if="menuModel == 'liked-message'">你还没有给任何消息点过赞</p>
    </div>
  </div>

</template>

<style scoped>
.user-page-wrap{
  padding-top: 30px;
}

.message-empty-wrap{
  height: 80px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
}

.message-empty-wrap>p{
  font-size: 20px;
  color: #474747;
  font-family: var(--font_family);
}
</style>