<script setup>
import { inject } from 'vue';

const props = defineProps({
  // index 当前菜单项的唯一索引，结合 currentIndex 决定菜单项是否高亮
  index: {
    type: [String, Number],
    required: true
  }
})

const emits = defineEmits(['click'])

// 接收 Menu父组件提供的currentIndex参数（只读），和更新该参数的函数
// 该参数决定 MenuItem 是否高亮显示
const { currentIndex, updateCurrentIndex }  = inject('current-index')

// 点击菜单项，修改高亮的菜单项，并触发父组件传入的 click事件
function menuItemClick() {
  if(currentIndex.value != props.index){
    updateCurrentIndex(props.index)
    emits('click')
  }
}
</script>

<template>
  <li 
    class="menu-item"
    :class="{ 'menu-item-active': index === currentIndex }"
    @click="menuItemClick"
  >
    <slot>菜单选项</slot>
  </li>
</template>

<style scoped>
.menu-item{
  background-color: var(--bg);
  color: var(--ink_black);

  margin-right: 10px;
  padding: 4px 10px;
  border-radius: 8px;

  user-select: none;
  cursor: pointer;

  display: inline-block;
}

.menu-item:hover{
  filter: brightness(0.95);
}

.menu-item-active{
  background-color: var(--theme_light_color);
  color: white;
}

.menu-item-active:hover{
  filter: brightness(1.1);
}
</style>