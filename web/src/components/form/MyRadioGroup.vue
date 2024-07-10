<!-- 
使用案例 1：
const options = [
  { value: '1', label: 'option1' },
  { value: '2', label: 'option2' },
  { value: '3', label: 'option3' }
]

<div style="padding: 20px 20px">
  <MyRadioGroup :options="options"
  v-model:value="radioValue"
  ></MyRadioGroup>
</div>

使用案例 2：
<div style="padding: 20px 20px">
  <MyRadioGroup v-model:value="radioValue">
    <MyRadio value="man">男</MyRadio>
    <MyRadio value="woman">女</MyRadio>
    <MyRadio value="secret">保密</MyRadio>
  </MyRadioGroup>
</div> -->

<script setup>
import { provide, watch } from 'vue';
import MyRadio from './MyRadio.vue';

const radioGroupValue = defineModel('value', { required: true })

const props = defineProps({
  options: Array, 
})

const emits = defineEmits(['change'])

// 1. 如果传入了 options 则根据 options 中的选项渲染 MyRadio组件（使用 v-for 渲染）
// 2. 如果没有传入 options，则将 radioGroupValue 提供给子组件（在插槽中）中的 
// MyRadio组件，如果没有给子组件中的 MyRadio 绑定v-model，则子组件会获取父组件
// 的 radioGroupValue 绑定给 单选框的 input
if(!props.options){
  provide('radioGroupValue', radioGroupValue)
}

// 当 单选框 的值 改变时，触发外部事件。
watch(
  () => radioGroupValue.value, 
  (newValue) => {
    emits('change', newValue)
  }
)

</script>

<template>
  <div v-if="options" class="my-radio-group">
    <MyRadio 
      v-for="option in options" :key="option.value"
      v-model="radioGroupValue"
      :value="option.value"
    >
      {{ option.label }}
    </MyRadio>
  </div>

  <div v-else class="my-radio-group">
    <slot></slot>
  </div>
</template>

<style scoped>
.my-radio-group{
  display: flex;
}
</style>