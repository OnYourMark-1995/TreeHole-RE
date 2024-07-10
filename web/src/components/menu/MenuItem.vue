<script setup>
import { computed, inject } from 'vue';

const props = defineProps({
  // index 当前菜单项的唯一索引，结合 currentIndex 决定当前菜单项是否高亮。若不传递，则该菜单项不会高亮。
  index: {
    type: [String, Number],
  },
  noChangeCurrentIndex: { // 点击后，不改变当前高亮的菜单项的高亮状态。
    type: Boolean,
    default: false
  },
  route: String // 路由。如果传递了，点击该菜单项，会跳转到该路由。
})

const emits = defineEmits(['click'])

// Menu 父组件提供了 currentIndex 参数（只读），和更新该参数的函数
const MenuEl = inject('MenuEl')

// Menu 父组件提供的 currentIndex 参数（只读），该参数决定 MenuItem 是否高亮显示
const currentIndex = computed(() => {
  return MenuEl.currentIndex.value
})

// 表单项之间是否为垂直分布
const isVerticalStyle = computed(() => {
  return MenuEl.isVerticalStyle
})

// 是否为大尺寸样式
const largeStyle = computed(() => {
  return MenuEl.largeStyle
})

// 是否居中显示
const itemContentCenter = computed(() => {
  return MenuEl.itemContentCenter
})

// 点击菜单项触发
function menuItemClick() {
  // 修改高亮的菜单项（如果需要的话）
  if(!props.noChangeCurrentIndex 
    && MenuEl.currentIndex.value != props.index
  ){
    MenuEl.updateCurrentIndex(props.index)
  }

  if(props.route){
    MenuEl.changeRoute(props.route)
  }

  // 触发传入的 click事件
  emits('click')
}


</script>

<template>
  <li
    class="menu-item"
    :class="{
      'menu-item-active': index && index === currentIndex,
      'horizon-menu-item': !isVerticalStyle,
      'vertical-menu-item': isVerticalStyle,
      'large-menu-item': largeStyle,
      'menu-item-content-center': itemContentCenter
    }"
    @click="menuItemClick"
  >
    <slot>菜单选项</slot>
  </li>
</template>

<style scoped>
.menu-item{
  background-color: var(--bg);
  color: var(--font_color_common);

  padding: 4px 12px;
  border-radius: 6px;
  box-sizing: border-box;

  user-select: none;
  cursor: pointer;

  display: inline-block;
}

.horizon-menu-item{
  margin-right: 10px;
}

.vertical-menu-item{
  margin: 2px 0; 
  width: 100%;
}

.large-menu-item{
  font-size: 18px;
  padding: 8px 0;
  padding-left: 25px;
  margin: 5px 0;
}

.menu-item-content-center{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding-left: 0;
}

.menu-item:hover{
  filter: brightness(0.95);
}

.menu-item-active{
  /* background-color: var(--theme_light_color);
  color: white;
  background-color: #c6e5e9; */
  background-color: #c9eaee;
  color: #09A2B5;
}

.menu-item-active:hover{
  filter: brightness(1.025);
}
</style>