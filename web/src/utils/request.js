import axios from 'axios';
import { BASE_URL, TOKEN_HTTP_HEADER } from '../config/request-config';
import useUserStore from '../store/useUserStore';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 6000,
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // console.log('request', config);
  const userStore = useUserStore()
  // 在请求头中 添加 jwt（携带jwt的请求头字段保存在requestConfig文件中）
  config.headers[TOKEN_HTTP_HEADER] = userStore.token

  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // console.log(response);
  const responseJsonData = response.data

  return responseJsonData;
}, function (error) {
  // console.log(error);
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default instance