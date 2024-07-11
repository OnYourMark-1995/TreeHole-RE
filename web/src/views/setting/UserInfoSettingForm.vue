<script setup>
import { computed, inject, ref } from 'vue';

import MyForm from '../../components/form/MyForm.vue';
import MyFormItem from '../../components/form/MyFormItem.vue';
import MyInput from '../../components/form/MyInput.vue';
import MyRadio from '../../components/form/MyRadio.vue';
import MyRadioGroup from '../../components/form/MyRadioGroup.vue';
import ImgUpload from '../../components/form/imgUpload/ImgUpload.vue';

import MyButton from '../../components/common/MyButton.vue';

import useUserStore from '../../store/useUserStore';
import userInfoValidator from '../../utils/validator/userInfoValidator';
import userApi from '../../api/userApi';
import { AVATAR_IMG_MAX_SIZE, AVATAR_IMG_MAX_SIZE_MB, AVATAR_IMG_UPLOAD_FORM_NAME } from '../../config/avatar-img-upload-config';

const userStore = useUserStore()

const userInfo = computed(() => {
  return userStore.userInfo
})

const userInfoForm  = ref({
  username: userInfo.value.username,
  email: userInfo.value.email,
  gender: userInfo.value.gender
})

const rules = {
  username: userInfoValidator['username'],
  email: userInfoValidator['email'],
  gender: userInfoValidator['gender']
}

const userInfoFromRef = ref(null)

const ImgUploadRef = ref(null)

const avatarImgValidate = (rawFile) => {
  if(rawFile.size > AVATAR_IMG_MAX_SIZE){
    NotifyEl.value.error(`图片容量太大，请选择体积小于${AVATAR_IMG_MAX_SIZE_MB}的图片`)
    return false
  }

  // 实际上图片格式可以不用校验的，因为 裁切之后的图片都是 jpeg，上传不会有问题。
  const mimetypeRegExp = new RegExp('^image\/(jpg|jpeg|png){1}', 'i')
  if(!mimetypeRegExp.test(rawFile.type)){
    NotifyEl.value.error('不支持当前图片格式，请选择jpg、jpeg、png格式的图片')
    return false
  }

  return true
}

const NotifyEl = inject('NotifyEl')

const updateUserInfo = async () => {
  const validateResult = userInfoFromRef.value.validate()
  if(!validateResult){
    NotifyEl.value.error('表单填写有误，请检查并修改后再提交。')
    return
  }

  try {
    // 获得更新后的用户信息
    const { data } = await userApi.updateUserInfo(userInfoForm.value)
    // 更新用户信息
    userStore.updateUserInfo(data)

    NotifyEl.value.success("用户信息更新成功")
  } catch (axiosError) {
    if(axiosError.code === 'ERR_NETWORK'){
      NotifyEl.value.error("用户信息更新失败。网络连接异常，请稍后再试！")
    } else {
      const { data } = axiosError.response
      NotifyEl.value.error(data.message)
    }
  }
}

const updateAvatarImg = async () => {
  const croppedImgFile = ImgUploadRef.value.getCroppedImgFile()

  if(!croppedImgFile) return

  const formData = new FormData()
  formData.append(AVATAR_IMG_UPLOAD_FORM_NAME, croppedImgFile)

  try {
    // 获取到返回的对象数据，其中包含了新的头像的 url
    const { data } = await userApi.updateAvatarImg(formData)
    // 更新用户数据
    userStore.updateUserInfo(data)

    NotifyEl.value.success("头像更新成功")
  } catch (axiosError) {
    if(axiosError.code === 'ERR_NETWORK'){
      NotifyEl.value.error("头像更新失败。网络连接异常，请稍后再试！")
    } else {
      const { data } = axiosError.response
      NotifyEl.value.error(data.message)
    }
  }
}

const submitHandler = () => {
  updateUserInfo()
  updateAvatarImg()
}

</script>

<template>
  <MyForm ref="userInfoFromRef" :model="userInfoForm" :rules="rules">
    <MyFormItem label="头像" info-message="支持jpeg、jpg、png格式的图片，文件需小于1M">
      <ImgUpload 
        :origin-img="userInfo.avatarImg"
        ref="ImgUploadRef"
        :file-validate="avatarImgValidate"
      />
    </MyFormItem>

    <MyFormItem label="用户名" prop="username">
      <MyInput v-model:value="userInfoForm.username"/>
    </MyFormItem>
    
    <MyFormItem label="电子邮箱" prop="email">
      <MyInput v-model:value="userInfoForm.email"/>
    </MyFormItem>

    <MyFormItem label="性别" prop="gender">
      <MyRadioGroup v-model:value="userInfoForm.gender">
        <MyRadio value="man">男</MyRadio>
        <MyRadio value="woman">女</MyRadio>
        <MyRadio value="secret">保密</MyRadio>
      </MyRadioGroup>
    </MyFormItem>
  </MyForm>

  <div class="user-info-form-button-wrap">
    <MyButton 
      @click="submitHandler" 
      width="85px" 
      height="38px"
    >保存</MyButton>
  </div>
</template>

<style scoped>
.user-info-form-button-wrap{
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>