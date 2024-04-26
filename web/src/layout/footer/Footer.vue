<script setup>
import Logo from '../../components/Logo.vue'
</script>

<template>
  <footer>
    <Logo height="30px"/>
    <span class="footer-text">CpoyRight © OneMark</span>
  </footer>
</template>

<style>
footer{
  box-sizing: border-box;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  box-shadow: 2px 0px 4px var(--shadow_color) ;

  background-color: var(--bg);
}

.footer-text{
  margin-left: 30px;
}
</style>