<script setup>
const isShowModel = defineModel("show", { required: true });
const props = defineProps({
  width: String,
  height: String,
  top: String
});

const emits = defineEmits(['close'])

const closePopUp = () => {
  isShowModel.value = false
  emits('close')
}

</script>

<template>
  <Transition name="fade">
    <div v-if="isShowModel" class="popup-mask" @click.stop="closePopUp">
      <div 
        class="popup-content-wrap"
        :style="{
          width: width,
          height: height,
          top: top
        }"
        @click.stop=""
      >
        <div class="close-icon" @click="closePopUp">
          <svg t="1712933562822" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4258" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20"><path d="M587.19 506.246l397.116-397.263a52.029 52.029 0 0 0 0-73.143l-2.194-2.194a51.98 51.98 0 0 0-73.143 0l-397.068 397.8-397.068-397.8a51.98 51.98 0 0 0-73.143 0l-2.146 2.194a51.054 51.054 0 0 0 0 73.143l397.069 397.263L39.544 903.461a52.029 52.029 0 0 0 0 73.142l2.146 2.195a51.98 51.98 0 0 0 73.143 0L511.9 581.583l397.068 397.215a51.98 51.98 0 0 0 73.143 0l2.194-2.146a52.029 52.029 0 0 0 0-73.143L587.19 506.246z" p-id="4259"></path></svg>
        </div>
        <div class="popup-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </Transition>
  
</template>

<style scoped>
.popup-mask{
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, .5);
  z-index: 999;
}

.popup-content-wrap{
  box-sizing: border-box;
  width: 50%;
  min-height: 200px;
  background-color: var(--white);
  border-radius: 5px;
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px 35px;
}

/* 
  这个过渡添加在绑定了v-if的div上，也就是.popup-mask
  这个过渡是必须要有的（或者也可以在Transition标签上添加：duration属性）
  没有这个过渡的话，在组件销毁时，.popup-mask会直接消失，这样就看不到
  .popup-mask的子标签.popup-content-wrap的过渡效果了
*/
.fade-enter-active,
.fade-leave-active{
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to{
  opacity: 0;
}

.fade-enter-active .popup-content-wrap,
.fade-leave-active .popup-content-wrap{
  transition: all 0.5s ease;
}

.fade-enter-from .popup-content-wrap,
.fade-leave-to .popup-content-wrap{
  transform: translate(-50%, -10%);
  opacity: 0;
}

.close-icon{
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}
</style>