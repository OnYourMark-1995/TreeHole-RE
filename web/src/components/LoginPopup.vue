<script setup>
import Popup from './common/Popup.vue'
import MyForm from './form/MyForm.vue';
import MyFormItem from './form/MyFormItem.vue';
import MyInput from './form/MyInput.vue';
import MyButton from './common/MyButton.vue';

import { provide, ref } from 'vue';
import userApi from '../api/userApi';
import useUserStore from '../store/useUserStore';
import userInfoValidator from '../utils/validator/userInfoValidator';
import { isStringEmpty, isEmail } from '../utils/validator/commonValidator';

const userStore = useUserStore()

const isShowModel = defineModel("show", { required: true })

const formMode = ref('loginMode')

const warnMessage = ref('')

const loginFormRef = ref(null)
const registerFormRef = ref(null)

const loginForm = ref({
  usernameOrEmail: "",
  password: ""
})

const loginFormRules = {
  usernameOrEmail: (value) =>{
    if(isStringEmpty(value)){
      throw new Error("您还未输入，请输入用户名 或 电子邮箱！")
    }
  },
  password: (value) => {
    if(isStringEmpty(value)){
      throw new Error("您还未输入，请输入密码！")
    }
  },
}

const registerForm = ref({
  username: "",
  email: "",
  password: ""
})

const registerFormRules = {
  username: userInfoValidator['username'],
  email: userInfoValidator['email'],
  password: userInfoValidator['password']
}

const loginHandler = async () => {
  console.log(loginFormRef);
  loginFormRef.value.validate(async (valid) => {
    if(!valid) return 
    
    try {
      let data
      if(isEmail(loginForm.value.usernameOrEmail)){
        ({ data } = await userApi.loginByEmail(
          loginForm.value.usernameOrEmail, 
          loginForm.value.password
        ))
      }
      else {
        ({ data } = await userApi.loginByUsername(
          loginForm.value.usernameOrEmail, 
          loginForm.value.password
        ))
      }
      userStore.setLoginInfo(data)

      closePopup()

    } catch (axiosError) {
      if(axiosError.code === 'ERR_NETWORK'){
        warnMessage.value = "您的网络连接异常，请稍后再试！"
      } else {
        const { data } = axiosError.response
        warnMessage.value = data.message
      }
    }
  })
}

const registerHandler = async () => {
  registerFormRef.value.validate(async (valid) => {
    if(!valid) return

    try {
      const { data } = await userApi.register(
        registerForm.value.username, 
        registerForm.value.email, 
        registerForm.value.password
      )

      console.log(data);
      userStore.setLoginInfo(data)

      closePopup()

    } catch (axiosError) {
      if(axiosError.code === 'ERR_NETWORK'){
        warnMessage.value = "您的网络连接异常，请稍后再试！"
      } else {
        const { data } = axiosError.response
        warnMessage.value = data.message
      }
    }
  })
}

const openPopup = () => {
  isShowModel.value = true
}

const closePopup = () => {
  isShowModel.value = false
}

// Popup 关闭时 调用。清除提示信息，否则下次打开会有上次打开的错误提示信息。
// Popup 组件关闭时会销毁，但是挂载在App.vue 中的 LoginPopup 组件并不会销毁。
// 毕竟 LoginPopup 组件 在 App.vue 中并没有用 v-if。
const onPopupClose = () => {
  warnMessage.value = ''
}

provide('LoginPopupEl', {
  open: openPopup,
  close: closePopup
})

defineExpose({
  open: openPopup,
  close: closePopup
})

</script>

<template>
  <Popup v-model:show="isShowModel" @close="onPopupClose" width="530px">
    <div class="tap-wrap">
      <div 
        @click="() => formMode = 'loginMode'" 
        class="tab-item"
        :class="{ 'tab-item-active': formMode === 'loginMode' }"
      >登录</div>
      <div class="tab-line"></div>
      <div 
        @click="() => formMode = 'registerMode'" 
        class="tab-item"
        :class="{ 'tab-item-active': formMode === 'registerMode' }"
      >注册</div>
    </div>

    <div class="warn-message-wrap">
      <div
        class="warn-message"
        :class="{ 'warn-message-hidden': warnMessage.length == 0}"
      >
        <img class="warn-icon-img" src="/images/warnIcon.png">
        {{ warnMessage }}
      </div>
    </div>

    <div class="form-wrap">
      <div v-if="formMode === 'loginMode'" class="login-form">
        <MyForm 
          label-width="100px"
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginFormRules"
        >
          <MyFormItem label="用户名/邮箱" prop="usernameOrEmail">
            <MyInput v-model="loginForm.usernameOrEmail" placeholder="请输入用户名或邮箱"/>
          </MyFormItem>
          <MyFormItem label="密码" prop="password">
            <MyInput v-model="loginForm.password" placeholder="请输入密码" password/>
          </MyFormItem>
        </MyForm>
        <div class="form-button-group">
          <MyButton plain-style width="100px" @click="closePopup">取消</MyButton>
          <MyButton @click="loginHandler" width="100px">登录</MyButton>
        </div>
      </div>

      <div v-else-if="formMode === 'registerMode'" class="register-form">
        <MyForm 
          label-width="80px"
          ref="registerFormRef"
          :model="registerForm"
          :rules="registerFormRules"
        >
          <MyFormItem label="用户名" prop="username">
            <MyInput v-model="registerForm.username" placeholder="请输入用户名"/>
          </MyFormItem>
          <MyFormItem label="邮箱" prop="email">
            <MyInput v-model="registerForm.email" placeholder="请输入邮箱"/>
          </MyFormItem>
          <MyFormItem label="密码" prop="password">
            <MyInput v-model="registerForm.password" placeholder="请输入密码" password/>
          </MyFormItem>
        </MyForm>
        <div class="form-button-group">
          <MyButton plain-style width="100px" @click="closePopup">取消</MyButton>
          <MyButton @click="registerHandler" width="100px">注册</MyButton>
        </div>
      </div>
    </div>
  </Popup>
</template>

<style scoped>
.tap-wrap{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 36px 0 6px 0;
}

.tab-item{
  color: #505050;
  font-size: 20px;
  cursor: pointer;
  user-select: none;
}

.tab-item.tab-item-active{
  color: var(--theme_light_color);
}

.tab-line{
  width: 1px;
  height: 20px;
  background-color: var(--gray_3);
  margin: 0 20px;
}

.form-button-group{
  padding: 0 100px;
  display: flex;
  justify-content: space-between;
}

.warn-message-wrap{
  margin-bottom: 10px;
}

.warn-icon-img{
  margin-right: 10px;
}

.warn-message{
  display: flex;
  align-items: center;

  margin: 0 15px;
  padding: 4px 12px;
  border-radius: 10px;
  background-color: orange;

  font-size: 16px;
  line-height: 16px;
  color: #ffffff;
}

.warn-message-hidden{
  visibility: hidden;
}
</style>