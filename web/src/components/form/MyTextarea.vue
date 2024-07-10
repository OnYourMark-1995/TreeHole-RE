<script setup>
import { ref } from 'vue';

const props = defineProps({
  placeholder: String,
  focusExpand: {
    type: Boolean,
    default: false
  },
  defaultMinHeight: {
    type: String,
    default: '38px'
  },
  focusMinHeight: {
    type: String,
    default: '68px'
  }
})

const valueModel = defineModel()

const isFocus = ref(false)

const focusHandler = () => {
  isFocus.value = true
}

const blurHandler = (event) => {
  isFocus.value = false
}

const inputHandler = (event) => {
  valueModel.value = event.target.innerText
  console.log(event);
}

</script>

<template>
  <div 
    class="my-textarea-wrap"
    :class="{
      'focus-expand': focusExpand && isFocus
    }"
    :style="{
      '--default_min_height': defaultMinHeight,
      '--focus_min_height': focusExpand ? focusMinHeight : '',
    }"
  >
    <div 
      contenteditable="true"
      class="my-textarea"
      :placeholder="placeholder"  
      @focus="focusHandler"
      @blur="blurHandler"
      @input="inputHandler"
    >{{ valueModel }}</div>
  </div>
</template>

<style scoped>
.my-textarea-wrap{
  display: flex;
  flex-direction: column;

  min-height: var(--default_min_height);
  transition: min-height ease 0.4s;
}

.my-textarea-wrap.focus-expand{
  min-height: var(--focus_min_height);
  transition: min-height ease 0.4s;
}

.my-textarea{
  display: inline-block;
  flex: 1;
  width: 100%;

  box-sizing: border-box;
  background-color: var(--gray_2);
  border: var(--gray_3) solid 1px;
  border-radius: 8px;
  padding: 8px 15px;

  font-size: 18px;
  font-family: var(--font_family);
  white-space: pre-wrap;
  color: rgb(57, 56, 56);

  transition: background-color ease-in 0.2s;
}

.my-textarea:hover{
  background-color: var(--gray_1);
  transition: background-color ease-in 0.2s;
}

.my-textarea:focus{
  background-color: var(--gray_1);
  border-color: var(--theme_light_color);
  box-shadow: 0 0 2px var(--theme_deep_color);
  outline: 0;
}

.my-textarea:empty:after{
  content: attr(placeholder);
  color: var(--font_color_common);
}
</style>