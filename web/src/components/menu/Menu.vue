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
import { useRouter } from 'vue-router';

const props = defineProps({
  vertical: { // 菜单项垂直分布，菜单项默认为 水平分布。 
    type: Boolean,
    default: false
  },
  largeStyle: Boolean, // 菜单项为大尺寸
  itemContentCenter: Boolean // 菜单项内容居中
})

// 该参数决定哪个 MenuItem 高亮显示
const currentIndex = defineModel('currentIndex', {
  type: [String, Number],
})

// 更新当前高亮的菜单项
function updateCurrentIndex(newIndex) {
  currentIndex.value = newIndex
}

// 改变路由的操作交由 Menu，而不是交给 MenuItem子组件。这样可以减少 路由器router 的声明次数
const router = useRouter()

function changeRoute(newRoute) {
  router.push(newRoute)
}

// 向 插槽中的 MenuItem 提供 currentIndex 参数
provide('MenuEl', {
  currentIndex: readonly(currentIndex),
  updateCurrentIndex,
  changeRoute,
  isVerticalStyle: props.vertical,
  largeStyle: props.largeStyle,
  itemContentCenter: props.itemContentCenter
})

</script>

<template>
  <ul 
    class="menu-bar"
    :class="{ 'menu-bar-vertical': vertical }"
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

.menu-bar-vertical{
  flex-direction: column;
}
</style>