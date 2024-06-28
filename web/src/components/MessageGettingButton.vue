/**
 * “获取更多消息” 的按钮样式封装
 */
<script setup>
import MyButton from './common/MyButton.vue';

const emits = defineEmits(['click'])
</script>

<template>
  <div class="get-message-button-wrap">
    <MyButton 
      @click="() => emits('click')" 
      width="80%"
    >点击获取更多</MyButton>
  </div>
</template>

<style>
.get-message-button-wrap{
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}
</style>