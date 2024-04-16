<script setup>
const props = defineProps({
  width: String,
  height: String,
  color: {
    type: String,
    // default: 'var(--theme-light-color)'
  },
  clickAction: Function,
  plainStyle: Boolean, 
  noBorder: Boolean
})
</script>

<template>
  <button @click.prevent="() => clickAction()" 
    class="button"
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
.button{
  cursor: pointer;

  box-sizing: border-box;
  padding: 5px 12px;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;

  font-size: 16px;

  font-family: var(--font_family);
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