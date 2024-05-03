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
  }
}
