import { defineStore } from 'pinia'
import { localGetLoginInfo, localSetLoginInfo } from '../utils/storage'

export const useUserStore = defineStore('user', {
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
    }
  },
})