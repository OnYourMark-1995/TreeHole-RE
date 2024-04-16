<script setup>
import Logo from './Logo.vue'
import MyButton from './common/MyButton.vue';
import Avatar from './common/Avatar.vue';
import defaultAvatar from '../assets/defaultAvatar.png';


</script>

<template>
  <header>
    <div class="left-content">
      <Logo height="30px"/>
    </div>
    
    <div class="right-content">
      <Avatar radius="40px" :imgSrc="defaultAvatar" style="cursor: pointer;" />
      <MyButton>退出登录</MyButton>
    </div>
  </header>
</template>

<style scoped>
header{
  box-sizing: border-box;
  height: 48px;
  display: flex;
  justify-content: space-between;
  padding: 8px 120px;
  box-shadow: 0 2px 4px var(--shadow_color) ;

  background-color: var(--bg);
}

.left-content{
  display: flex;
  justify-content: center;
  align-items: center;
}

.right-content{
  display: flex;
  justify-content: center;
  align-items: center;
}

.right-content > *{
  margin-left: 10px;
}
</style>