<script setup>
import MessageCardList from '../../components/MessageCardList.vue';
import MessageEditor from './MessageEditor.vue';
import MyButton from '../../components/common/MyButton.vue';
import defaultAvatar from '../../assets/defaultAvatar.png';
import { ref } from 'vue';

defineOptions({
  name: 'Home'
})

const message = {
  messageId: 1,
  avatarImg: defaultAvatar,
  username: 'Asuka haha',
  date: '2024-4-14',
  likeCount: 12,
  likeId: 12,
  content: '菜分甲、乙、丙三等。甲菜以土豆、白菜、粉条为主，里面有些叫人嘴馋的大肉片，每份三毛钱；乙菜其他内容和甲菜一样，只是没有肉，每份一毛五分钱；丙菜可就差远了，清水煮白萝卜——似乎只是为了掩饰这过分的清淡，才在里面象征性地漂了几点辣子油花。'
}

const message1 = {
  messageId: 2,
  avatarImg: defaultAvatar,
  username: 'Asuka haha',
  date: '2024-4-14',
  likeCount: 12,
  content: '只是没有肉，每份一毛五分钱；丙菜可就差远了，清水煮白萝卜——似乎只是为了掩饰这过分的清淡，才在里面象征性地漂了几点辣子油花。'
}

const message2 = {
  messageId: 3,
  avatarImg: defaultAvatar,
  username: 'Asuka haha',
  date: '2024-4-14',
  likeCount: 12,
  content: '只是没有肉，每份一毛五分钱；丙菜可就差远了，清水煮'
}

const message3 = {
  messageId: 4,
  avatarImg: defaultAvatar,
  username: 'Asuka haha',
  date: '2024-4-14',
  likeCount: 12,
  content: '只是没有肉，每份一毛五分钱；丙菜可就差远了，清水煮'
}

const messageList = ref([message, message1])

// const messageList = ref([])

const getMoreMessages = () => {
  messageList.value.push(message2, message3)
}
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