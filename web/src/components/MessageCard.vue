<!-- 
const message = {
  messageId: 1,
  avatarImg: defaultAvatar,
  username: 'Asuka Hello',
  date: '2024-4-14',
  likeCount: 12,
  likeDetailId: 12,
  content: '菜分甲、乙、丙三等。甲菜以土豆、白菜、粉条为主...'
}
 -->

<script setup>
import Avatar from './common/Avatar.vue';

const props = defineProps({
  message: {
    type: Object,
    required: true
  }
})

const clickLike = () => {
  
}
</script>

<template>
  <li class="message-card-wrap">
    <div class="message-avatar-part">
      <Avatar :img-src="message.avatarImg" radius="55px" border-color="var(--theme_light_color)"/>
    </div>

    <div class="message-main-part">
      <div class="message-info-wrap">

        <div class="message-info-left">
          <span class="message-username">{{ message.username }}</span>
          <span class="message-date">{{ message.date }}</span>
        </div>

        <div class="message-info-right">
          <!-- 若 likeId 不为 undefined，就渲染为激活态 -->
          <span class="message-like"
            :class="{ 'message-like-active': message.likeDetailId }"
          >
            点赞({{ message.likeCount }})
          </span>
        </div>
      </div>

      <div class="message-content-wrap">
        <span class="message-content">{{ message.content }}</span>
      </div>
    </div>
  </li>
</template>

<style scoped>
.message-card-wrap{
  display: flex;

  width: 100%;

  padding: 10px;
  box-sizing: border-box;
  border: var(--theme_deep_color) solid 1px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.30);
  background-color: var(--bg);

  margin-bottom: 24px;
}

.message-avatar-part{
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 10px;
}

.message-main-part {
  flex: 1;
  /* 不设置 宽度为 0 的话，消息文本过宽时会溢出。详见：https://juejin.cn/post/6974356682574921765 */
  width: 0;
}

.message-info-wrap{
  width: 100%;

  display: flex;
  justify-content: space-between;

  margin-bottom: 6px;
}

.message-info-wrap .message-info-left {
  flex: 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.message-info-wrap .message-info-right {
  flex: 0;
  
  display: flex;
  justify-content: center;
  align-items: center;
}

.message-username{
  white-space: nowrap;
  font-size: 20px;
  color: var(--font_color_common);
  font-family: var(--font_family);
}

.message-date{
  white-space: nowrap;
  font-size: 14px;
  font-family: var(--font_family);
}

.message-like{
  white-space: nowrap;
  font-size: 16px;
  font-family: var(--font_family);
  cursor: pointer;
}

.message-like.message-like-active{
  color: var(--red);
}

.message-main-part .message-content-wrap{
  width: 100%;
  box-sizing: border-box;

  background-color: var(--message_content_wrap_bg);
  border: var(--message_content_wrap_border) solid 1px;
  border-radius: 5px;
  padding: 5px 10px;
}

.message-content{
  color: var(--font_color_common);
  font-size: 16px;
  font-family: var(--font_family);
  line-height: 1.5;

  word-wrap: break-word;
  white-space: normal;
}
</style>