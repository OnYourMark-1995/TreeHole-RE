<script setup>
import { reactive, ref } from 'vue';
import Popup from '../../common/Popup.vue';
import MyButton from '../../common/MyButton.vue';
import { VueCropper } from 'vue-cropper'; 

const isShowModel = defineModel('show', { required: true })

const props = defineProps({
  imgSrc: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['confirm'])

const cropperRef = ref(null)

// vue-cropper的配置项，详见 https://github.xyxiao.cn/vue-cropper/#1-props
const cropperOption = reactive({
  outputSize: 1,  // 裁剪生成图片的质量
  outputType: 'jpeg', // 裁剪出的图片的格式
  sideLength: 120, // 裁剪框 的原始边长
})

// 预览框 的配置，参考 https://github.xyxiao.cn/vue-cropper/#2-%E5%8F%AF%E7%94%A8%E5%9B%9E%E8%B0%83%E6%96%B9%E6%B3%95
const previewOption = reactive({
  sideLength: 120, // 预览框的边长
  realTimeData: {},
  realTimeStyle: {}
})

const realTimePreview = (data) => {
  previewOption.realTimeData = data

  previewOption.realTimeStyle = {
    width: data.w + "px",
    height: data.h + "px",
    overflow: "hidden",
    margin: "0",
    zoom: previewOption.sideLength / data.w

    /*  zoom: previewWrapSideLength.value / data.w,
        等价于：
        transform: `scale(${previewWrapSideLength.value / data.w})`,
        'transform-origin': 'left top'  */
  }
}

// 确定 裁剪图片
const confirmCrop = () => {
  // 详见 https://github.xyxiao.cn/vue-cropper/#2-%E5%86%85%E7%BD%AE%E6%96%B9%E6%B3%95-%E5%92%8C-%E5%B1%9E%E6%80%A7
  cropperRef.value.getCropBlob((cropBlob) => {
    emits('confirm', cropBlob)
    isShowModel.value = false
  })
}

// 取消 裁剪图片
const cancelCrop = () => {
  isShowModel.value = false
}

</script>

<template>
<Popup v-model:show="isShowModel" width="560px" top="100px">
  <div class="img-cropper-popup-wrap">
    <!-- 图片裁剪区 -->
    <div class="img-cropper-work-part">
      <VueCropper 
        ref="cropperRef"
        info
        :img="imgSrc"
        :outputSize="cropperOption.outputSize"
        :outputType="cropperOption.outputType"
        autoCrop
        :autoCropWidth="cropperOption.sideLength + 'px'"
        :autoCropHeight="cropperOption.sideLength + 'px'"
        centerBox
        fixed
        :fixedNumber="[1,1]"
        @realTime="realTimePreview"
      />
    </div>


    <!-- 头像预览区 -->
    <div class="img-cropper-preview-part">
      <!-- 预览框 -->
      <div class="img-cropper-preview-wrap"
        :style="{
          width: previewOption.sideLength + 'px',
          height: previewOption.sideLength + 'px'
        }"
      >
        <!-- vue-cropper 的示例，详见 https://github.xyxiao.cn/vue-cropper/#2-%E5%8F%AF%E7%94%A8%E5%9B%9E%E8%B0%83%E6%96%B9%E6%B3%95 -->
        <div :style="previewOption.realTimeStyle"> 
          <div :style="previewOption.realTimeData.div">
            <img :src="previewOption.realTimeData.url" :style="previewOption.realTimeData.img">
          </div>
        </div>
      </div>
      
      <!-- 确定/取消 按钮 -->
      <div class="img-cropper-button-group">
        <MyButton @click="cancelCrop" width="70px" plain-style>取消</MyButton>
        <MyButton @click="confirmCrop" width="70px">确定</MyButton>
      </div>
    </div>
  </div>
</Popup>
</template>

<style scoped>
.img-cropper-popup-wrap{
  display: flex;
}

.img-cropper-work-part{
  height: 270px;
  width: 270px;
}

.img-cropper-preview-part{
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-left: 20px;
}

.img-cropper-preview-wrap{
  border-radius: 50%;
  overflow: hidden;
}

.img-cropper-button-group{
  width: 100%;
  box-sizing: border-box;
  padding: 0 25px;

  transform: translateY(30px);

  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>