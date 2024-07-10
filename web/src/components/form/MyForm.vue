<script setup>
import { provide } from 'vue';

const props = defineProps({
  labelWidth: String,  // 标签的宽度
  rules: Object, // 表单校验规则
  model: Object // 表单值
})

/**
 * 保存 插槽中的 MyFormItem组件 暴露给父组件 MyForm 的对象
 */
const fields = []

/**
 * 插槽中的 MyFormItem组件 通过这个函数，将一些对象传递给父组件
 * @param {Object} field 
 */
const addField = (field) => {
  fields.push(field)
}

/**
 * 数组，记录表单校验后各表单项的错误信息，每个数组项包含 校验失败的表单项 和 校验失败的错误消息 
 */
const errorField = []

/**
 * 校验表单的所有参数
 * @param {Function} callback 回调函数，两个参数：1. 校验结果，布尔值。2. 错误信息，包含校验失败的表单项和校验失败的错误消息 
 * @returns {Boolean} 校验的结果，校验成功返回 true，失败则返回 false
 */
const validate = (callback) => {
  for(const field of fields){
    try {
      field.validate()
    } catch (error) {
      errorField.push({
        fieldProp: field.prop, 
        error
      })
    }
  }
  
  if(errorField.length > 0){
    callback?.(false, errorField)
    return false
  } else {
    callback?.(true)
    return true
  }
}

provide('myForm', {
  labelWidth: props.labelWidth,
  rules: props.rules,
  model: props.model,
  addField,
})

defineExpose({
  validate
})
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