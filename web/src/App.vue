<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { RouterView } from 'vue-router';

</script>

<template>
  <Header id="header"/>
  <main id="main">
    <router-view></router-view>
  </main>
  <Footer id="footer"/>
</template>
  
<style scoped>
#header{
  position: sticky;
  top: 0;
  flex-grow: 0;
  flex-shrink: 0;
  z-index: 99;
}

#main{
  flex: 1;
  background-image: url('./assets/魔女宅急便壁纸.jpg');
  background-position: center;
  background-size: cover;
}

#footer{
  flex-grow: 0;
  flex-shrink: 0;
}
</style>
