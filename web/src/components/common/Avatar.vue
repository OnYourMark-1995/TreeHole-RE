<script setup>
const props = defineProps({
  imgSrc: String, // 头像图片
  radius: { // 圆形外框的半径，css单位，px，wv，hv，%等都可以
    type: String,
    default: '40px'
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
  textFontSize: { // 文字模式 文字大小
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
    <!-- 如果有默认插槽，展示默认插槽的内容 -->
    <div v-if="$slots.default" class="avatar-content">
      <slot></slot>
    </div>
    <!-- 如果是 文字模式，头像框中展示 文字 -->
    <p v-else-if="textMode" :style="{ 'font-size': textFontSize }">{{ textContent }}</p>
    <!-- 如果不是以上两种情况，展示头像图片 -->
    <img v-else :src="imgSrc" alt="avatar">
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

.avatar-content{
  width: 100%;
  height: 100%;
}
</style>