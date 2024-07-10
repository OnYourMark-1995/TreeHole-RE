<script setup>
const props = defineProps({
  width: String, // 按钮宽度
  height: String, // 按钮高度
  color: { // 按钮颜色
    type: String,
    // default: 'var(--theme-light-color)'
  },
  plainStyle: Boolean, // 朴素按钮样式
  noBorder: Boolean // 无边框样式
})

/*  
  一定要在 defineEmits 中注册 click 事件，否则在父组件中绑定的 @click 
  会被 透传 到当前组件的根元素上（详见vue3文档关于透传的介绍），同时因为
  在当前组件的根元素上已经绑定了一个 @click，导致根元素上绑定了两次click事件
  点击按钮会触发两个 click事件绑定的函数。
*/
const emits = defineEmits(['click'])

</script>

<template>
  <!-- 将 type 设置为 ‘button’，就可以防止在表单中使用按钮触发默认事件 -->
  <button 
    type="button"
    @click="$emit('click')" 
    class="my-button"
    :class="[ plainStyle ? 'plain-button' : 'general-button' ]" 
    :style="{
      width: width,
      height: height,
      'background-color': !plainStyle && color,
      border: (noBorder ? 'none' : '')
    }"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.my-button{
  cursor: pointer;

  box-sizing: border-box;
  padding: 5px 12px;
  border-radius: 8px;
  /* border-width: 1px;
  border-style: solid; */

  font-size: 16px;
  font-family: var(--font_family);
  letter-spacing: 2px;
}

.general-button{
  background-color: var(--theme_light_color);
  border: var(--theme_deep_color) solid 1px;
  color: white;
}

.general-button:hover{
  filter: brightness(1.1);
}

.general-button:active{
  filter: brightness(0.95);
}

.plain-button{
  border: var(--theme_light_color) solid 2px;
  color: black;
  background-color: #ffffff;
}

.plain-button:hover{
  background-color: #f5f7fa;
}

.plain-button:active{
  background-color: #f0f2f5;
}
</style>