<script setup>
import { inject, ref } from 'vue';

const value = defineModel('value')

const props = defineProps({
  placeholder: String,
  password: Boolean
})

// 获取 MyFormItem 提供的对象
const myFormItem = inject('myFormItem', undefined)

const isError = ref(false)

/**
 * 表单失去焦点时 触发的事件
 */
const blurHandler = () => {
  try {
    myFormItem.validate()
    isError.value = false
  } catch (error) {
    // console.log('error');
    isError.value = true
  }
}
</script>

<template>
  <input 
    v-model="value" 
    :type="password ? 'password' : 'text'" 
    class="my-text-input"
    :class="{ 'my-text-input-error': isError }"
    :placeholder="placeholder"
    autocomplete="on"
    @blur="blurHandler"
  >
</template>

<style>
.my-text-input{
  width: 100%;

  font-size: 16px;

  box-sizing: border-box;
  padding: 5px 12px;

  border: var(--gray_3) solid 1px;
  border-radius: 5px;
}

.my-text-input:focus{
  border-color: var(--theme_light_color);
  box-shadow: 0 0 2px var(--theme_deep_color);
  /* border-inline-end-width: 1px; */
  outline: 0;
}

.my-text-input-error{
  border-color: rgba(255, 0, 0, 0.72);
  /* box-shadow: 0 0 2px rgb(183, 0, 0); */
}
</style>