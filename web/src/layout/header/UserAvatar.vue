<script setup>
import Avatar from '../../components/common/Avatar.vue';
import defaultAvatar from '../../assets/defaultAvatar.png';

import Tip from '../../components/common/Tip.vue';
import { ref } from 'vue';

const isTipContentShow = ref(false)

// 点击 下拉框中的任意 li标签 都要收起下拉框，而不是只有路由跳转才收起

</script>

<template>
  <Tip v-model:show="isTipContentShow">
    <template #reference>
      <Avatar radius="40px" :imgSrc="defaultAvatar" style="cursor: pointer;" />
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