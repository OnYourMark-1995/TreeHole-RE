<script setup>
import { provide } from 'vue';
const props = defineProps({
  labelWidth: String
})

// 为  MyFormItem 组件提供 labelWidth
if( props.labelWidth ){
  provide("label-width", props.labelWidth)
}
</script>

<template>
  <form class="my-form">
    <slot></slot>
  </form>
</template>

<style scoped>
.my-form{
  box-sizing: border-box;

  width: 100%;
  height: 100%;
}
</style>