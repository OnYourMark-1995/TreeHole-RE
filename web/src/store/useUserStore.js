import { defineStore } from 'pinia'
import { localGetLoginInfo, localSetLoginInfo } from '../utils/storage'

const useUserStore = defineStore('user', {
  state: () => ({
    loginInfo: localGetLoginInfo()
  }),
  getters: {
    token(state) {
      return state.loginInfo.token
    },
    userInfo(state) {
      return state.loginInfo.userInfo
    }
  },
  actions: {
    setLoginInfo(loginInfo) {
      localSetLoginInfo(loginInfo)
      this.loginInfo = loginInfo
    },
    updateUserInfo(updatedUserInfo) {
      Object.assign(this.loginInfo.userInfo, updatedUserInfo)
      console.log(this.loginInfo);
      localSetLoginInfo(this.loginInfo)
    }
  },
})

export default useUserStore