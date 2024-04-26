<script setup>
import UserCard from './UserCard.vue';
import { ref } from 'vue';

import defaultAvatar from '../../assets/defaultAvatar.png';

defineOptions({
  name: 'User'
})

const userInfo = ref({
  username: '各务原抚子',
  avatarImg: defaultAvatar,
  likeCount: 32
})

</script>

<template>
  <div class="user-page-wrap">
    <UserCard :user="userInfo"/>
    <h1>user</h1>
  </div>
</template>

<style scoped>
.user-page-wrap{
  padding-top: 30px;
}
</style>