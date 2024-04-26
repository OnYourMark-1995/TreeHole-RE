<script setup>
import MessageCard from '../components/MessageCard.vue';
import MessageCardList from '../components/MessageCardList.vue';
import defaultAvatar from '../assets/defaultAvatar.png';

import MyButton from '../components/common/MyButton.vue';
import MyButtonC from '../../test/MyButtonC.vue';

import Menu from '../components/menu/Menu.vue';
import MenuItem from '../components/menu/MenuItem.vue';

import UserCard from '../views/user/UserCard.vue';

import UserAvatar from '../layout/header/UserAvatar.vue';

import { onMounted, ref } from 'vue';

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

const menuModel = ref('sended-message')

const userInfo = ref({
  username: '各务原抚子',
  avatarImg: defaultAvatar,
  likeCount: 32
})

const messageList = ref([message, message1])
onMounted(() => {
  setTimeout(() => {
    messageList.value.push(message2)
    messageList.value.push(message3)
  } ,1000)
})

// import { login } from '../api/userApi';
// onMounted(async () => {
//   const res = await login()
//   console.log(res);
// })

</script>

<template>

  <div style="width: 100%;">
    <UserAvatar style="margin-left: 300px;"/>
  </div>
  

  <!-- <MessageCardList :message-list="messageList"/> -->
  <!-- <div class="main-content">
    <MessageCard :message="message"/>
    <MessageCard :message="message"/>
    <MessageCard :message="message"/>
    <MessageCard :message="message"/>
    <MessageCard :message="message1"/>
  </div> -->
  <!-- <MyButton>hello world</MyButton> -->

  <!-- <Menu v-model:current-index="menuModel" vertical style="margin-left: 200px;">
    <MenuItem index="sended-message" @click="() => console.log('sended')">你发送的</MenuItem>
    <MenuItem index="liked-message" @click="() => console.log('liked')">你点了赞</MenuItem>
  </Menu> -->
  
  <!-- <div class="main-content">
    <UserCard :user="userInfo"/>
  </div> -->
  
  <!-- <form action="/submit">
    <MyButton @click="() => console.log('ni bu hao')">mybutton</MyButton>
    <MyButtonC @click.prevent="() => console.log('ni hao')">mybutton copy</MyButtonC>
    <MyButtonC @click="() => console.log('ni hao')">mybutton copy</MyButtonC>
  </form> -->
</template>

<style scoped>
.main-content{
  width: 800px;
  margin: 0 auto;
}
</style>