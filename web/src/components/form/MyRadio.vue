<script setup>
import { inject } from 'vue';

// 假如在 MyRadio组件 上绑定了v-model，则优先取 MyRadio 上的 model
// 如果没有在 MyRadio 上绑定v-model，则尝试获取来自父组件 MyRadioGroup（如果有该父组件的话）
// 上 注入的radioGroupValue作为 model
let model = defineModel()
if(!model.value){
  model = inject('radioGroupValue')
}

const props = defineProps({
  value: {
    required: true
  },
  change: Function // 绑定值变化时触发的事件
})
</script>

<template>
  <!-- 将 input 放在 label 中，input 会和外层的 label 关联在一起 -->
  <label class="my-radio" :class="{ 'my-radio-checked': model === value }">
    <span class="my-radio-input">
      <span class="my-radio-inner"></span>
      <input 
        type="radio"
        v-model="model" 
        :value="value" 
        @change="change"
        class="my-radio-origin-input"
      >
    </span>
    
    <span class="my-radio-label-span">
      <slot>单选框Label</slot>
    </span>
  </label>
  
</template>

<style scoped>
.my-radio{
  display: inline-block;
  margin-right: 15px;
  padding: 4px 4px;
}

.my-radio-input{
  display: inline-block;
  margin-right: 8px;
}

.my-radio-inner{
  box-sizing: border-box;

  width: 14px;
  height: 14px;
  border: var(--gray_3) solid 1px;
  border-radius: 50%;

  /* relative作用：1. after伪元素绝对定位； 2. 原生input隐藏； 3.设置top向下挪动一点位置 */
  position: relative;
  /* 向下挪动 1px，和文字差不多齐高 */
  top: 1px;
  display: inline-block;
}

.my-radio-inner:after{
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;

  position: absolute;
  top: 2px;
  left: 2px;

  background-color: var(--theme_light_color);
  opacity: 0;
  transition: opacity 50ms ease;
}

.my-radio.my-radio-checked  .my-radio-inner{
  border-color: var(--theme_light_color);
} 

.my-radio.my-radio-checked  .my-radio-inner:after{
  opacity: 1;
  transition: opacity 0.5s;
}

.my-radio-origin-input{
  /* 隐藏原生的 input，设置绝对定位，使其脱离文档流，不占位置 */
  opacity: 0;
  position: absolute;
}

.my-radio-label-span{
  color: var(--font_color_deep);
  font-family: var(--font_family);
}
</style>