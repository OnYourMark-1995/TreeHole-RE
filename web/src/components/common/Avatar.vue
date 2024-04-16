<script setup>
const props = defineProps({
  imgSrc: String, // 头像图片
  radius: { // 圆形外框的半径，css单位，px，wv，hv，%等都可以
    type: String,
    default: '30px'
  },
  borderColor: { // 边框颜色
    type: String,
    // default: 'var(--ink_black)'
  },
  textMode: { // 文字模式，若为true，头像内部显示文本，而不是图片
    type: Boolean,
    default: false
  },
  textContent: { // 配合文字模式使用，若选择文字模式，头像框中显示 testContent 的内容
    type: String,
  },
  textBackgroundColor: { // 文字模式背景颜色
    type: String,
    default: 'var(--theme_light_color)'
  },
  textFontSize: {
    type: String,
    default: '20px'
  }
})
</script>

<template>
  <div class="avatar-wrap" :style="{ 
    width: radius, 
    height: radius,
    'border-color': borderColor,
    'background-color': textMode && textBackgroundColor,
  }">
    <p v-if="textMode" :style="{ 'font-size': textFontSize }">{{ textContent }}</p>
    <img v-else :src="imgSrc" alt="avator">
  </div>
</template>

<style scoped>
.avatar-wrap{
  box-sizing: border-box;

  border-radius: 50%;
  border-width: 3px;
  border-style: solid;
  border-color: var(--ink_black);
  
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-wrap p{
  color: white;
}

.avatar-wrap img{
  width: 100%;
  height: 100%;
}
</style>