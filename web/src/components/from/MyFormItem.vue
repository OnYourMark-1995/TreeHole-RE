<script setup>
const props = defineProps({
  label: String,
  labelWidth: String
})
</script>

<template>
  <div class="my-form-item">
    <div class="my-form-label-wrap"
      :style="{
        width: labelWidth
      }"
    >
      <label class="my-form-label">{{ label }} :</label>
    </div>

    <div class="my-input-wrap">
      <slot></slot>
    </div>
    
  </div>
</template>

<style scoped>
.my-form-item{
  width: 100%;
  display: flex;
  margin-bottom: 20px;
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
}
</style>