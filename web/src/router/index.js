import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';

import Test from '../views/test/Test.vue';
import Home from '../views/home/index.vue';
// const Home = () => import('../views/home/index.vue')
import User from '../views/user/index.vue';
import Setting from '../views/setting/index.vue';
import About from '../views/about/index.vue';

import UserInfoSettingForm from '../views/setting/UserInfoSettingForm.vue';
import PasswordChangeForm from '../views/setting/PasswordChangeForm.vue';

import useUserStore from '../store/useUserStore';

const routes = [
  { path: '/', redirect: '/test' },
  { path: '/home', component: Home },
  {
    path: '/user', 
    component: User, 
    beforeEnter: [checkIsLogin] 
  },
  {
    path: '/setting', 
    component: Setting, 
    beforeEnter: [checkIsLogin],
    children: [
      { path: '', redirect: '/setting/profile' },
      { path: 'profile', name: 'profile', component: UserInfoSettingForm },
      { path: 'password', name: 'password-modify', component: PasswordChangeForm }
    ]
  },
  { path: '/about', component: About },
  { path: '/test', component: Test },
]

const router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(),
  routes, // `routes: routes` 的缩写
})

export default router

function checkIsLogin(to, from) {
  const userStore = useUserStore()
  if(!userStore.token){
    return { path: '/home' }
  }
}