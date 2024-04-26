<script setup>
import { ref, onMounted, watch } from 'vue';

const isTipDropShow = defineModel('show', {
  type: Boolean,
  default: false
})

// 获取根元素，依据此根元素计算包裹的子元素的大小，
const tipWrapRef = ref(null)

// 下拉框的绝对定位的 top 和 left
const dropWrapPosition = ref({
  top: 0,
  left: 0
})

// 在组件挂载完成后，计算出下拉框的绝对定位位置
onMounted(() => {
  dropWrapPosition.value.top = `${tipWrapRef.value.offsetWidth}px`
  dropWrapPosition.value.left = tipWrapRef.value.offsetHeight/2 + 'px'
})

/* 
  点击事件：点击 reference插槽里的元素后 出现下拉框
  并且给 document 绑定点击事件，当点击当前元素外部时，隐藏下拉框
*/
function tipReferenceClickedHandler(event) {
  // 取消事件冒泡
  event.stopPropagation()

  if(isTipDropShow.value === false) {
    isTipDropShow.value = true
  }
}

// 若 isTipDropShow 变为 true，即显示下拉框
// 给 document 添加点击事件，当点击外部时，隐藏下拉框
watch(
  () => isTipDropShow.value,
  (newValue) => {
    if(newValue === false) return

    // 给 document 添加点击事件，当点击外部时，隐藏下拉框
    document.addEventListener('click', function documentClicked() {
      isTipDropShow.value = false
      document.removeEventListener('click', documentClicked)
    })
  },
  { immediate: true }
)

</script>

<template>
  <!-- 
    tip-relative-wrap 是包裹 下拉框 和 触发下拉框的元素reference 的外层元素，
    这个元素的 display 为 inline-block，下拉框为绝对定位，所以
    这个元素的大小被 reference元素 撑开。
    可以通过这个元素获得 reference元素的大小，从而计算出下拉框
    的位置。
    此外这个元素是 相对定位的，绝对定位的下拉框相对此元素定位
  -->
  <div class="tip-relative-wrap" ref="tipWrapRef" @click="tipReferenceClickedHandler">
    <!-- 该插槽中的元素是触发下拉框的元素，当鼠标移动到该元素时，出现下拉框 -->
    <div class="reference-content">
      <slot name="reference"></slot>
    </div>

    <!-- 
      绝对定位的下拉框，注意要取消该元素的点击事件冒泡，防止点击该元素的
      内部元素时，发生事件冒泡，一直冒泡到外层 触发 tip-relative-wrap 的点击事件
    -->
    <div
      v-show="isTipDropShow"
      class="tip-drop-wrap"
      :style="{
        top: dropWrapPosition.top,
        left: dropWrapPosition.left,
        transform: 'translateX(-50%)'
      }"
      @click.stop=""
    >
      <!-- 该插槽是 下拉框的内容 -->
      <slot name="tip-content"></slot>
    </div>
  </div>
</template>

<style>
.tip-relative-wrap{
  display: inline-block;
  position: relative;
}

.tip-drop-wrap {
  position: absolute;
  display: inline-block;
  
  padding: 10px;
  margin-top: 6px;
  min-width: 100px;

  background-color: var(--bg);
  border-radius: 4px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
}
</style>