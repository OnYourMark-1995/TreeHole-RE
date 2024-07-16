<script setup>
import Avatar from '../../components/common/Avatar.vue';
import Tip from '../../components/common/Tip.vue';
import Menu from '../../components/menu/Menu.vue';
import MenuItem from '../../components/menu/MenuItem.vue';

import { computed, inject, ref } from 'vue';
import useUserStore from '../../store/useUserStore';
import { useRouter } from 'vue-router';

const isTipContentShow = ref(false)

const userStore = useUserStore()

const router = useRouter()

const isLogin = computed(() => {
  return userStore.token != ''
})

const userInfo = computed(() => {
  return userStore.userInfo
})

const avatarImgUrl = computed(() => {
  return userInfo.value.avatarImg
})

const LoginPopupEl = inject('LoginPopupEl')

const closeTip = () => {
  isTipContentShow.value = false
}

const logoutHandler = () => {
  // TODO:退出登录功能未完善，目前仅在前端清除了浏览器本地的 token
  userStore.clearLoginInfo()
  
  // router.replace('/home')
  // 退出登录后，刷新整个网页。
  router.go(0)

  // 退出成功后，关闭下拉框
  closeTip()
}

</script>

<template>
  <Avatar 
    v-if="!isLogin" 
    radius="40px"
    text-mode
    text-content="登录"
    text-font-size="16px"
    style="cursor: pointer;"
    @click="() => LoginPopupEl.open()"
  />

  <Tip v-else v-model:show="isTipContentShow">
    <template #reference>
      <Avatar radius="40px" :imgSrc="avatarImgUrl" style="cursor: pointer;" />
    </template>

    <template #tip-content>
      <Menu vertical>
        <MenuItem route="/user" @click="closeTip">我的主页</MenuItem>
        <MenuItem route="/setting" @click="closeTip">设置</MenuItem>
        <MenuItem route="/about" @click="closeTip">关于</MenuItem>
        <MenuItem @click="logoutHandler">退出登录</MenuItem>
      </Menu>
    </template>
  </Tip>
</template>

<style scoped>
.drop-item{
  display: block;
  text-wrap: nowrap;
}
</style>