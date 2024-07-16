<script setup>
import Header from './layout/header/Header.vue';
import Footer from './layout/footer/Footer.vue';
import { RouterView } from 'vue-router';
import { ref, provide } from 'vue';

import LoginPopup from './components/LoginPopup.vue';
import Notify from './components/notify/Notify.vue';

// 登录弹窗 是否显示
const isLoginPopupShow = ref(false)
const LoginPopupEl = ref(null)
provide("LoginPopupEl", LoginPopupEl)

const NotifyEl = ref(null)
provide('NotifyEl', NotifyEl)
</script>

<template>
  <Header id="header"/>
  <main id="main">
    <div class="main-content">
      <router-view v-slot="{ Component }">
        <KeepAlive include="Home">
          <component :is="Component"/>
        </KeepAlive>
      </router-view>
    </div>
  </main>
  <Footer id="footer"/>

  <LoginPopup ref="LoginPopupEl" v-model:show="isLoginPopupShow" />
  <Notify ref="NotifyEl"/>
  
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
  /* flex: 1; */
  /* background: url('./assets/魔女宅急便壁纸.jpg'); */
  background: url('/images/background.jpg'); /* 背景放在public中，是静态公共文件 */
  background-position: center;
  background-size: cover;
  background-attachment: fixed;

  /* 设置 最小高度为 视口高度，这样加上header和footer的高度，整个页面的高度
  一定高于视口高度，一定会有滚动条。这样可以防止页面高度变化时，滚动条突然出现
  或隐藏导致的页面抖动 */
  min-height: 100vh;
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
