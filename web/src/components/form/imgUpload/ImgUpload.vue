<script setup>
import { nextTick, ref, watch } from 'vue';
import ImgCropper from './ImgCropper.vue';
import Avatar from '../../common/Avatar.vue';
import 'vue-cropper/dist/index.css'

const props = defineProps({
  originImg: String, // 头像选择框 默认展示 的图片
  fileValidate: Function // 校验上传的原始文件，返回值为 false时，校验不通过。
})

const inputRef = ref(null)

const isImgCropperShow = ref(false)

// 从 文件上传表单 获取的原始图片的 base64 数据
const rawBase64ImgSrc = ref('')

// 头像选择框 回显 的图片
const displayedImgSrc = ref('')

// 回显的图片的 dom元素
const displayedImgRef = ref(null)

// 当外部传递的 props.originImg 改变时，重新设置 回显的图片，这个 监听器 初始化时会执行一次。
watch(
  () => props.originImg,
  (newValue) => {
    displayedImgSrc.value = newValue
  },
  { immediate: true }
)

const clickHandler = () => {
  // 触发 文件上传表单 的点击事件
  inputRef.value.click()
}

const fileChangeHandler = (event) => {
  const rawFile = event.target.files[0]
  // 清除 <input type="file"> 控件的内容，否则上传同一张文件时不触发 change 事件
  event.target.value = null

  // 如果传递了 fileValidate 钩子，则调用该钩子。若该钩子的返回值为 false，则校验不通过。
  if(props.fileValidate && !props.fileValidate(rawFile)){
    return
  }

  const reader = new FileReader()
  reader.readAsDataURL(rawFile)
  reader.onload = () => {
    rawBase64ImgSrc.value = reader.result
    isImgCropperShow.value = true
  }
}

// 保存裁切后的 头像图片的 blob
let croppedImgBlob = null

const imgCropperConfirm = async (imgBlob) => {
  croppedImgBlob = imgBlob

  // 生成 回显的图片的 url
  displayedImgSrc.value = URL.createObjectURL(imgBlob)

  /*
    displayedImgSrc 不为 null时，才会渲染出 displayedImgRef 指向的 dom 元素，
    displayImgSrc 为 null时，displayedImgRef为 null。
    
    displayedImgSrc 改变发生的 dom 更新完成后，displayedImgRef 指向的 dom 元素
    才会被浏览器渲染出来，才能绑定 load 事件。因此，此处需要使用 await nextTick()，
    等待 displayedImgSrc 改变发生的 dom 更新完成。
  */
  await nextTick()
  displayedImgRef.value.addEventListener('load', function displayedImgLoad() {
    // 图片在页面渲染完成后，释放资源
    URL.revokeObjectURL(displayedImgSrc.value)
    displayedImgRef.value.removeEventListener('load', displayedImgLoad)
  })
}

const getCroppedImgFile = () => {
  if(!croppedImgBlob) return 
  return new File([croppedImgBlob], 'avatar.jpeg', { type: 'image/jpeg' })
}

defineExpose({
  getCroppedImgFile
})

</script>

<template>
  <Avatar radius="75px">
    <div @click="clickHandler" class="avatar-upload-wrap">
      <div v-if="displayedImgSrc" class="avatar-upload-content img-fill-content">
        <img ref="displayedImgRef" :src="displayedImgSrc">

        <div class="fill-avatar center-aligned-mask">
          <span class="choose-img-span">选择图片</span>
        </div>
      </div>
      
      <div v-else class="avatar-upload-content img-empty-content">
        <svg t="1720434459407" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4269" width="18" height="18"><path d="M864 480H544V160c0-17.67-14.33-32-32-32s-32 14.33-32 32v320H160c-17.67 0-32 14.33-32 32s14.33 32 32 32h320v320c0 17.67 14.33 32 32 32s32-14.33 32-32V544h320c17.67 0 32-14.33 32-32s-14.33-32-32-32z" fill="#333333" p-id="4270"></path></svg>
        <span class="choose-img-span">选择图片</span>
      </div>
      
      <!-- 隐藏的 文件上传表单 -->
      <input 
        ref="inputRef"
        type="file"
        accept="image/*"
        style="display: none;"
        @change="fileChangeHandler"
        @click.stop
      >
    </div>
  </Avatar>

  <ImgCropper 
    v-model:show="isImgCropperShow" 
    :img-src="rawBase64ImgSrc"
    @confirm="imgCropperConfirm"
  />

</template>

<style scoped>
.avatar-upload-wrap{
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.avatar-upload-content{
  width: 100%;
  height: 100%;
  position: relative;
}

.fill-avatar{
  position: absolute;
  inset: 0;
}

.img-fill-content img{
  width: 100%;
  height: 100%;
}

.avatar-upload-wrap:hover .center-aligned-mask{
  opacity: 1;
}

.center-aligned-mask{
  background-color: rgba(0, 0, 0, 0.4);

  display: inline-flex;
  justify-content: center;
  align-items: center;

  color: var(--gray_1);

  opacity: 0;
  transition: opacity 0.2s ease;
}

.img-empty-content{
  background-color: var(--gray_1);

  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: var(--font_color_common);
}

.choose-img-span{
  font-size: 14px;
  font-family: var(--font_family);
}
</style>