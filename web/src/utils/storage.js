const LOGIN_INFO_KEY = "th_login_info"

const defaultLoginInfo = {
  token: '',
  userInfo: {
    userId: '',
    username: '',
    email: '',
    gender: '',
    avatarImg: ''
  }
}

export const getDefaultLoginInfo = () => {
  return defaultLoginInfo
}

export const localGetLoginInfo = () => {
  const loginInfo = localStorage.getItem(LOGIN_INFO_KEY)
  // 若本地不存在查找的数据，result为空，返回默认值
  return loginInfo ? JSON.parse(loginInfo) : defaultLoginInfo
}

export const localSetLoginInfo = (loginInfo) => {
  localStorage.setItem(LOGIN_INFO_KEY, JSON.stringify(loginInfo))
}

export const localRemoveLoginInfo = () => {
  localStorage.removeItem(LOGIN_INFO_KEY)
}