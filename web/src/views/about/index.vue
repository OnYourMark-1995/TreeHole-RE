<script setup>
import Logo from '../../components/Logo.vue';

defineOptions({
  name: 'About'
})
</script>

<template>
  <div class="about-page-content-wrap">
    <div class="about-page-content-inner-wrap">
      
      <div class="top-part">
        <div class="top-part-content">
          <Logo height="28px"/>
          <span class="division-line">|</span>
          <span class="about-page-title">简介</span>
        </div>
      </div>

      <div class="main-part">
        <p>
          &emsp;&emsp;你好，欢迎来到TreeHole，如你所见，这是一个实时树洞网页，你可以在这里看到他人发布的消息，你发表的消息也会被其他人看见，你可以在这里分享你的快乐，也可以宣泄你的烦恼。希望这个小小的网站能为你带来一点乐趣，为沉闷乏味的生活带来一点明亮的色彩。
        </p>
        <p>
          &emsp;&emsp;注意：在网络发言时，请遵纪守法，尊重他人，注意个人隐私。
        </p>
        <!-- <p>
          本站的建站技术栈为：Vue3、NodeJs/Express、MySql
        </p> -->
      </div>
    </div>
    
  </div>
</template>

<style scoped>
.about-page-content-wrap{
  box-sizing: border-box;
  padding: 12px;
  margin-top: 24px;
  
  background-color: var(--bg);
  border-radius: 8px;

  font-family: var(--font_family);
}

.about-page-content-inner-wrap{
  border: var(--theme_light_color) dashed 3px;
  border-radius: 6px;

  padding: 32px 32px 12px 32px;
}

.top-part-content{
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;

  transform: translateX(-20px);
}

.top-part-content>span{
  color: #474747;
}

.top-part .about-page-title{
  font-family: inherit;
  font-size: 22px;
}

.division-line{
  margin: 0 10px;
  font-size: 24px;
}

.main-part{
  font-size: 18px;
  color: #343434;
}

.main-part>p{
  line-height: 1.8em;
  letter-spacing: 1px;
}
</style>