<script setup>
import { ref } from 'vue';

import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

import Avatar from './components/common/Avatar.vue';
import defaultAvatar from './assets/defaultAvatar.png';

import Logo from './components/Logo.vue';

import MyButton from './components/common/MyButton.vue';

import MyInput from './components/from/MyInput.vue';
import MyFormItem from './components/from/MyFormItem.vue';
import MyForm from './components/from/MyForm.vue';
import MyRadio from './components/from/MyRadio.vue';
import MyRadioGroup from './components/from/MyRadioGroup.vue';

import Popup from './components/common/Popup.vue';
import { RouterView } from 'vue-router';

const radioValue = ref('1')
const isPopupShow = ref(false);
</script>

<template>
  <!-- <Header />
  <main>
    <view-router></view-router>
  </main>
  <Footer /> -->
  <!-- <Avatar radius="60px" :imgSrc="defaultAvatar" border-color="#bfa" />
  <Avatar radius="60px" :imgSrc="defaultAvatar" />
  <Avatar radius="60px" text-mode text-content="登录" />
  <Logo width="100px"/>

  <MyButton>通用按钮</MyButton>
  <MyButton plain-style>退出登录</MyButton>
  <MyButton plain-style no-border>无边框按钮</MyButton> -->

  <div class="form-wrap">
    <MyForm>
      <MyFormItem label="姓名">
        <!-- <MyInput v-model:value=""></MyInput> -->
        <MyInput></MyInput>
      </MyFormItem>
      <MyFormItem label="年龄">
        <MyInput></MyInput>
      </MyFormItem>
      <MyFormItem label="性别">
        <MyRadioGroup v-model:value="radioValue">
          <MyRadio value="man">男</MyRadio>
          <MyRadio value="woman">女</MyRadio>
          <MyRadio value="secret">保密</MyRadio>
        </MyRadioGroup>
      </MyFormItem>
      
    </MyForm>
  </div>

  <button @click="() => isPopupShow=!isPopupShow">fuck</button>
  
  <Popup v-model="isPopupShow" width="400px">
    <div style="width: 100%; text-align: center; font-size: 32px; margin-bottom: 20px;">
      <span>登录</span>
    </div>
    <MyForm>
      <MyFormItem label="姓名" label-width="50px">
        <MyInput></MyInput>
      </MyFormItem>
      <MyFormItem label="年龄" label-width="50px">
        <MyInput></MyInput>
      </MyFormItem>
      <MyFormItem label="性别" label-width="50px">
        <MyRadioGroup v-model:value="radioValue">
          <MyRadio value="man">男</MyRadio>
          <MyRadio value="woman">女</MyRadio>
          <MyRadio value="secret">保密</MyRadio>
        </MyRadioGroup>
      </MyFormItem>
    </MyForm>
  </Popup>
</template>
  
<style scoped>
.form-wrap{
  width: 400px;
  box-sizing: border-box;
  padding: 20px 20px;
  border: black solid 1px;
  margin: 0 auto;
}
</style>
