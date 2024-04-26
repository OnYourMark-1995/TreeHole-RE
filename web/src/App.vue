<script setup>
import Header from './layout/header/Header.vue';
import Footer from './layout/footer/Footer.vue';
import { RouterView } from 'vue-router';

</script>

<template>
  <Header id="header"/>
  <main id="main">
    <router-view class="main-content"></router-view>
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
  background-attachment: fixed;
}

#main .main-content{
  width: 800px;
  margin: 0 auto;
}

@media screen and (max-width: 1080px) {
  #main .main-content{
    width: auto;
    margin: 0 20px;
  }
}

#footer{
  flex-grow: 0;
  flex-shrink: 0;
}
</style>
