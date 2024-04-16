<script setup>
const value = defineModel('value')

const props = defineProps({
  placeholder: String
})

</script>

<template>
  <input v-model="value" type="text" class="my-text-input" :placeholder="placeholder">
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
</style>