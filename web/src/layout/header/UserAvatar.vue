<script setup>
import Avatar from '../../components/common/Avatar.vue';

import Tip from '../../components/common/Tip.vue';
import { computed, inject, ref } from 'vue';
import useUserStore from '../../store/useUserStore';

const isTipContentShow = ref(false)
const userStore = useUserStore()

const isLogin = computed(() => {
  return userStore.token != ''
})

const userInfo = computed(() => {
  return userStore.userInfo
})

const avatarImgUrl = computed(() => {
  return userInfo.value.avatarImg
})

const isLoginPopupShow = inject('isLoginPopupShow')

// 点击 下拉框中的任意 li标签 都要收起下拉框，而不是只有路由跳转才收起

</script>

<template>
  <Avatar 
    v-if="!isLogin" 
    radius="40px"
    text-mode
    text-content="登录"
    text-font-size="16px"
    style="cursor: pointer;"
    @click="() =>  isLoginPopupShow = true"
  />

  <Tip v-else v-model:show="isTipContentShow">
    <template #reference>
      <Avatar radius="40px" :imgSrc="avatarImgUrl" style="cursor: pointer;" />
    </template>

    <template #tip-content>
      <ul class="drop-list">
        <li class="drop-item">
          <router-link to="/user">
            我的主页
          </router-link>
        </li>

        <li class="drop-item">
          <router-link to="/setting">
            设置
          </router-link>
        </li>

        <li class="drop-item">
          <router-link to="/about">
            关于
          </router-link>
        </li>

        <li class="drop-item">
          退出登录
        </li>
      </ul>
    </template>
  </Tip>
</template>

<style scoped>
.drop-item{
  display: block;
  text-wrap: nowrap;
}
</style>