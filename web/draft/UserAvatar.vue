<script setup>
import Avatar from '../../components/common/Avatar.vue';
import defaultAvatar from '../../assets/defaultAvatar.png';
import { ref, onMounted } from 'vue';

const containRef = ref(null)

const position = ref({
  top: 0,
  left: 0
})

onMounted(() => {
  console.log(containRef);
  console.log(containRef.value.offsetWidth);
  position.value.top = `${containRef.value.offsetWidth}px`
  // console.log(`calc(${containRef.value.offsetWidth}px-50%)`);
  position.value.left = containRef.value.offsetHeight/2 + 'px'
})


</script>

<template>
  <div class="user-avatar-wrap" ref="containRef">
    <Avatar radius="50px" :imgSrc="defaultAvatar" style="cursor: pointer;" />
    <div class="user-avatar-drop-wrap"
      :style="{
        top: position.top,
        left: position.left,
        transform: 'translateX(-50%)'
      }"
    >
      <ul class="drop-list">
        <li class="drop-item">我的主页</li>
        <li class="drop-item">退出登录</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.user-avatar-wrap{
  display: inline-block;
  position: relative;
  left: 400px;
}

.user-avatar-drop-wrap {
  position: absolute;
  top: px;
  left: 40px;

  background-color: var(--bg);
  padding: 10px;
  width: 100px;
}

.drop{
  display: block;
}
</style>