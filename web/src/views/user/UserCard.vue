<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import Avatar from '../../components/common/Avatar.vue';
import MyButton from '../../components/common/MyButton.vue';
import Menu from '../../components/menu/Menu.vue';
import MenuItem from '../../components/menu/MenuItem.vue'

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const menuModel = ref('sended-message')

const router = useRouter()
</script>

<template>
  <div class="user-card-wrap">
    <div class="user-info-part">
      <div class="user-info-avatar-wrap">
        <Avatar :img-src="user.avatarImg" radius="65px" border-color="var(--theme_light_color)"/>
      </div>

      <div class="user-info-main-wrap">

        <div class="user-info-main-left">
          <span class="user-username">{{ user.username }}</span>
          <span class="user-like-count">获赞数：{{ user.likeCount }}</span>
        </div>

        <div class="user-info-main-right">
          <MyButton plain-style class="user-info-setting-button" @click="() => router.push('/setting')">设置</MyButton>
        </div>
      </div>
    </div>
    
    <div class="user-choose-menu-part">
      <Menu v-model:current-index="menuModel">
        <MenuItem index="sended-message" @click="() => console.log('sended')">你发送的</MenuItem>
        <MenuItem index="liked-message" @click="() => console.log('liked')">你点了赞</MenuItem>
      </Menu>
    </div>
  </div>
</template>

<style scoped>
.user-card-wrap{
  width: 100%;
  background-color: var(--bg);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.30);

  box-sizing: border-box;
  padding: 10px 15px;
}

.user-info-part{
  display: flex;
  padding-bottom: 8px;

  border-bottom: var(--theme_light_color) solid 2px;
}

.user-info-avatar-wrap{
  flex-grow: 0;
  flex-shrink: 0;

  margin-right: 10px;
}

.user-info-main-wrap{
  flex: 1;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info-main-left{
  display: flex;
  flex-direction: column;
}

.user-choose-menu-part{
  padding-top: 8px;
}
</style>