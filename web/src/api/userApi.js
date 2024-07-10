import request from '../utils/request';

export default {
  register: (username, email, password) => {
    return request.post('/user/register', {
      username,
      email,
      password
    })
  },

  loginByUsername: (username, password) => {
    return request.post('/user/login', {
      username,
      password
    })
  },

  loginByEmail: (email, password) => {
    return request.post('/user/login', {
      email,
      password
    })
  },

  updateUserInfo: (userInfo) => {
    return request.post('/user/update/info', {
      username: userInfo.username,
      email: userInfo.email,
      gender: userInfo.gender
    })
  },

  updateAvatarImg: (formData) => {
    return request.post('/user/update/avatar', formData)
  }
}
