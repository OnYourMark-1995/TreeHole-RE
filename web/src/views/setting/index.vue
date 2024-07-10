<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import Menu from '../../components/menu/Menu.vue';
import MenuItem from '../../components/menu/MenuItem.vue';

defineOptions({
  name: 'Setting'
})

const route = useRoute()

// 用于动态生成左侧的菜单。
const menuOptions = [
  // title 是展示在菜单项中的文字，action 是 菜单项被点击后触发的事件
  // index 对应路由名（需要与路由的name一致），route 对应跳转的 路由地址
  {
    title: '个人信息',
    index: 'profile',
    route: '/setting/profile'
  },
  {
    title: '修改密码',
    index: 'password-modify',
    route: '/setting/password'
  },
  {
    title: '注销账号',
    action: unregister
  }
]

const curMenuIndex = ref('')

watch(
  () => route.name,
  (newValue) => {
    curMenuIndex.value = newValue
  },
  { immediate: true }
)

const curMenuTitle = computed(() => {
  const curMenuOption = menuOptions.find((menuOption) => {
    return menuOption.index === curMenuIndex.value
  })
  return curMenuOption.title
})

// 注销用户 功能
function unregister() {
  console.log("点击了 注销用户");
}
</script>

<template>
  <div class="setting-page-content-wrap">
    <div class="left-menu-part">
      <div class="menu-part-title">
        <span class="menu-part-title-span">设置</span>
      </div>

      <div class="menu-part-wrap">
        <Menu v-model:current-index="curMenuIndex" vertical large-style item-content-center>
          <!-- 注意 MenuItem 的 'no-change-current-index'。点击某个表单项时，
           若不引起路由跳转，则不将该表单项的样式改为激活态。 -->
          <MenuItem 
            v-for="option in menuOptions" 
            :key="option"
            :index="option?.index"
            :route="option?.route"
            :no-change-current-index="!option?.route"
            @click="option?.action"
          >
            {{ option.title }}
          </MenuItem>
        </Menu>
      </div>
    </div>

    <div class="right-work-part">
      <div class="work-part-title">
        <span class="work-part-title-span">{{ curMenuTitle }}</span>
      </div>

      <div class="work-part-main">
        <router-view />
        <!-- <UserInfoSettingForm /> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.setting-page-content-wrap{
  display: flex;
  justify-content: space-between;

  margin-top: 30px;
  margin-bottom: 20px;
}

.left-menu-part{
  width: 160px;
  min-height: 800px;

  background-color: var(--bg);
  border-radius: 4px;

  margin-right: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.30);
}

.menu-part-wrap{
  padding: 8px;
}

.menu-part-title{
  padding-top: 10px;

  display: flex;
  justify-content: center;
}

.menu-part-title-span{
  font-size: 20px;
  font-family: var(--font_family);
  color: var(--font_color_common);
  font-weight: bold;
}

.right-work-part{
  flex: 1 0 200px;
  min-height: 800px;

  background-color: var(--bg);
  border-radius: 4px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.30);
}

.work-part-title{
  height: 30px;
  padding: 5px 12px;
  border-bottom: 2px solid var(--gray_3);

  line-height: 30px;
}

.work-part-title-span{
  color: var(--font_color_common);
  font-family: var(--font_family);
  font-size: 18px;
}

.work-part-main{
  padding: 30px;
}
</style>