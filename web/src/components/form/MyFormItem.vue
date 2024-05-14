<script setup>
import { computed, inject, onMounted, provide, ref } from 'vue';

const props = defineProps({
  label: String,
  prop: String
})

// 获取 MyForm 提供的对象
const myForm = inject('myForm', undefined)

// labelWidth 由 MyForm 组件提供（可选）
const labelWidth = computed(() => {
  return myForm?.labelWidth
})

/**
 * 当前表单项内的表单的值（从 myFrom.model 中获取）
 */
const fieldValue = computed(() => {
  const model = myForm?.model
  if(!model || !props.prop) {
    return
  }
  return model[props.prop]
})

// 挂载时将 一些对象 注册到父组件 MyForm
onMounted(() => {
  if(!myForm || !props.prop) return

  myForm.addField({
    validate,
    prop: props.prop
  })
})

/**
 * 响应式数据，渲染到页面的错误提示
 */
const errorMessage = ref('')

/**
 * 校验当前表单项
 */
const validate = () => {
  errorMessage.value = ''

  if(fieldValue.value === undefined) return 
  
  const validator = myForm?.rules?.[props.prop]
  if(!validator) return
  
  try {
    validator(fieldValue.value)
  } catch (error) {
    console.log(error);
    errorMessage.value = error.message
  }
}

provide('myFormItem', {
  validate,
})

defineExpose({
  validate
})
</script>

<template>
  <div class="my-form-item">
    <div class="my-form-label-wrap"
      :style="{ width: labelWidth }"
    >
      <label class="my-form-label">{{ label }} :</label>
    </div>

    <div class="my-input-wrap">
      <slot></slot>
      <span class="error-message">{{ errorMessage }}</span>
    </div>
    
  </div>
</template>

<style scoped>
.my-form-item{
  width: 100%;
  margin-bottom: 24px;
  display: flex;
}

.my-form-label-wrap{
  flex-grow: 0;
  flex-shrink: 0;
  /* flex-basis: 20%; 设置flex-basis 固定label宽度的方法 */
  width: 80px; /* 写死 width 固定 label 宽度的方法 */
  text-align: end; /* 该容器中的 行内元素 靠右对齐 */
  align-self: center;
  vertical-align: middle;
  margin-right: 20px;
}

.my-input-wrap{
  flex: 1;
  position: relative;
}

.error-message{
  position: absolute;
  bottom: -18px;
  left: 0;

  color: red;
  font-size: 14px;
  font-family: var(--font_family);
}

</style>