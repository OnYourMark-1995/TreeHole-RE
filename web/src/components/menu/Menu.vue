<!-- 
使用案例；
const menuModel = ref('sended-message')

<Menu v-model:current-index="menuModel">
  <MenuItem index="sended-message" @click="() => console.log('sended')">你发送的</MenuItem>
  <MenuItem index="liked-message" @click="() => console.log('liked')">你点了赞</MenuItem>
</Menu>
 -->

<script setup>
import { provide, readonly } from 'vue';

const props = defineProps({
  vertical: {
    type: Boolean,
  }
})

// 该参数决定哪个 MenuItem 高亮显示
const currentIndex = defineModel('currentIndex', {
  type: [String, Number],
  required: true
})

function updateCurrentIndex(newIndex) {
  currentIndex.value = newIndex
}

// 向 插槽中的 MenuItem 提供 currentIndex 参数
provide('current-index', {
  currentIndex: readonly(currentIndex),
  updateCurrentIndex
})

</script>

<template>
  <ul 
    class="menu-bar"
    :class="{ 'menu-vertival': vertical }"
  >
    <slot></slot>
  </ul>
</template>

<style scoped>
.menu-bar{
  display: flex;
  align-items: center;

  width: 100%;
  margin: 0;
  padding: 0;
}

.menu-vertival{
  flex-direction: column;
}
</style>