import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';

// import Test from '../views/test/Test.vue';

const Home = () => import('../views/home/index.vue')
const User = () => import('../views/user/index.vue')
const Setting = () => import('../views/setting/index.vue')
const About = () => import('../views/about/index.vue')
const NotFound = () => import('../views/notFound/index.vue')

// const UserInfoSettingForm = import('../views/setting/UserInfoSettingForm.vue')
// const PasswordChangeForm = import('../views/setting/PasswordChangeForm.vue')

import UserInfoSettingForm from '../views/setting/UserInfoSettingForm.vue'
import PasswordChangeForm from '../views/setting/PasswordChangeForm.vue'
import useUserStore from '../store/useUserStore';

const routes = [
  { path: '/', redirect: '/home' },
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
  // { path: '/test', component: Test },
  // 将匹配所有内容并将其放在 `route.params.pathMatch` 下
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
})

export default router

function checkIsLogin(to, from) {
  const userStore = useUserStore()
  if(!userStore.token){
    return { path: '/home' }
  }
}