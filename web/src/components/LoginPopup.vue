<script setup>
import Popup from './common/Popup.vue'
import MyForm from './form/MyForm.vue';
import MyFormItem from './form/MyFormItem.vue';
import MyInput from './form/MyInput.vue';
import MyButton from './common/MyButton.vue';

import warnIconImg from '../assets/warnIcon.png';

import { ref } from 'vue';
import { isEmail, isStringEmpty } from '../utils/argumentValidator';
import userApi from '../api/userApi';
import { useUserStore } from '../store/useUserStore';

const userStore = useUserStore()

const isShowModel = defineModel("show", { required: true })

const warnMessage = ref("")

const formMode = ref('loginMode')

const loginForm = ref({
  usernameOrEmail: "",
  password: ""
})

const registerForm = ref({
  username: "",
  email: "",
  password: ""
})

// 现在的参数校验像屎一样，要把参数校验添加到每个 inputItem 组件中
const loginHandler = async () => {
  if(isStringEmpty(loginForm.value.usernameOrEmail)){
    warnMessage.value = "用户名/邮箱 不能为空"
  } 
  else if(isStringEmpty(loginForm.value.password)){
    warnMessage.value = "密码 不能为空"
  }
  else{
    warnMessage.value = ""

    let res
    try {
      if(isEmail(loginForm.value.usernameOrEmail)){
        res = await userApi.loginByEmail(
          loginForm.value.usernameOrEmail, 
          loginForm.value.password
        )
      }
      else {
        res = await userApi.loginByUsername(
          loginForm.value.usernameOrEmail, 
          loginForm.value.password
        )
      }
      const { data } = res.data
      userStore.setLoginInfo(data)

      isShowModel.value = false

    } catch (axiosError) {
      const { data } = axiosError.response
      warnMessage.value = data.message
    }
  } 
}

const registerHandler = async () => {
  if(isStringEmpty(registerForm.value.username)){
    warnMessage.value = "用户名 不能为空"
  } 
  else if(isStringEmpty(registerForm.value.email)){
    warnMessage.value = "邮箱 不能为空"
  }
  else if(!isEmail(registerForm.value.email)){
    warnMessage.value = "邮箱 格式不正确"
  }
  else if(isStringEmpty(registerForm.value.password)){
    warnMessage.value = "密码 不能为空"
  }
  else {
    warnMessage.value = ""
    try {
      const res = await userApi.register(
        registerForm.value.username, 
        registerForm.value.email, 
        registerForm.value.password
      )
      const { data } = res.data

      console.log(data);
      userStore.setLoginInfo(data)

      isShowModel.value = false

    } catch (axiosError) {
      const { data } = axiosError.response
      warnMessage.value = data.message
    }
  }
}

</script>

<template>
  <Popup v-model:show="isShowModel" width="500px">
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
      <div v-show="warnMessage.length" class="warn-message">
        <img class="warn-icon-img" :src="warnIconImg">
        {{ warnMessage }}
      </div>
    </div>

    <div class="form-wrap">
      <div v-if="formMode === 'loginMode'" class="login-form">
        <MyForm label-width="100px">
          <MyFormItem label="用户名/邮箱">
            <MyInput v-model="loginForm.usernameOrEmail" placeholder="请输入用户名或邮箱"/>
          </MyFormItem>
          <MyFormItem label="密码">
            <MyInput v-model="loginForm.password" placeholder="请输入密码" password/>
          </MyFormItem>
        </MyForm>
        <div class="form-button-group">
          <MyButton plain-style width="100px" @click="() => isShowModel = false">取消</MyButton>
          <MyButton @click="loginHandler" width="100px">登录</MyButton>
        </div>
      </div>

      <div v-else-if="formMode === 'registerMode'" class="register-form">
        <MyForm label-width="100px">
          <MyFormItem label="用户名">
            <MyInput v-model="registerForm.username" placeholder="请输入用户名"/>
          </MyFormItem>
          <MyFormItem label="邮箱">
            <MyInput v-model="registerForm.email" placeholder="请输入邮箱"/>
          </MyFormItem>
          <MyFormItem label="密码">
            <MyInput v-model="registerForm.password" placeholder="请输入密码" password/>
          </MyFormItem>
        </MyForm>
        <div class="form-button-group">
          <MyButton plain-style width="100px" @click="() => isShowModel = false">取消</MyButton>
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
  margin: 16px 0;
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
  margin: 10px 0;
}

.warn-icon-img{
  margin-right: 10px;
}

.warn-message{
  display: flex;
  align-items: center;

  margin: 0 15px;
  padding: 5px 15px;
  border-radius: 10px;
  background-color: orange;

  font-size: 16px;
  line-height: 16px;
  color: #ffffff;
}
</style>