import { defineStore } from 'pinia'
import { getDefaultLoginInfo, localGetLoginInfo, localRemoveLoginInfo, localSetLoginInfo } from '../utils/storage'

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
      localSetLoginInfo(this.loginInfo)
    },

    clearLoginInfo() {
      localRemoveLoginInfo()
      this.loginInfo = getDefaultLoginInfo()
    }
  },
})

export default useUserStore