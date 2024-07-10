<script setup>
import { computed, inject, ref } from 'vue';
import MyTextarea from '../../components/form/MyTextarea.vue';
import MyButton from '../../components/common/MyButton.vue';
import useUserStore from '../../store/useUserStore';
import messageApi from '../../api/messageApi';

const messageContent = ref('')

const userStore = useUserStore()

const isLogin = computed(() => {
  return userStore.token != ''
})

const userInfo = computed(() => {
  return userStore.userInfo
})

const LoginPopupEl = inject('LoginPopupEl')
const NotifyEl = inject('NotifyEl')

const cancelHandler = () => {
  messageContent.value = ''
}

const submitHandler = async () => {
  if(!isLogin.value){
    NotifyEl.value.warning('您没有登录，请先登录或注册。')
    LoginPopupEl.value.open()
    return
  }

  // 用户未输入信息时，按钮禁止点击比较好
  if(!messageContent.value.length){
    window.alert("你未输入任何文字")
    return
  }

  try {
    await messageApi.sendMessage(
      messageContent.value, 
      new Date(), 
      userInfo.value.userId
    )
    NotifyEl.value.success("消息发送成功")
    messageContent.value = ''
  } catch (axiosError) {
    if(axiosError.code === 'ERR_NETWORK'){
      NotifyEl.value.error("您的网络连接异常，请稍后再试！")
    } else {
      const { data } = axiosError.response
      NotifyEl.value.error(data.message)
    }
  }
  
}

</script>

<template>
  <div class="message-editor-wrap">
    <MyTextarea 
      v-model="messageContent"
      placeholder="说点什么吧~~"
    />

    <div class="message-editor-bottom">
      <div class="message-editor-button-group">
        <MyButton @click="cancelHandler" width="100px" plain-style>取消</MyButton>
        <MyButton @click="submitHandler" width="100px">发送</MyButton>
      </div>
    </div>
  </div>
</template>

<style>
.message-editor-wrap{
  background-color: var(--bg);

  box-sizing: border-box;
  padding: 10px;
  border-radius: 10px;

  margin-top: 20px;
  margin-bottom: 20px;
}

.message-editor-button-group{
  display: flex;
  justify-content: end;
}

.message-editor-button-group > *{
  margin-top: 6px;
  margin-left: 20px;
}
</style>