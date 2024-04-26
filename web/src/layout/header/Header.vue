<script setup>
import Logo from '../../components/Logo.vue'
import MyButton from '../../components/common/MyButton.vue';
import UserAvatar from './UserAvatar.vue';

</script>

<template>
  <header>
    <div class="left-content">
      <Logo height="30px"/>
    </div>
    
    <div class="right-content">
      <UserAvatar />
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