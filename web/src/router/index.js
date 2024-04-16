import {createRouter, createWebHashHistory} from 'vue-router';

import Test from '../views/Test.vue';

// 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { path: '/', redirect: '/test' },
  // { path: '/home', component: Home },
  // { path: '/user', component: User },
  { path: '/test', component: Test },
]

// 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  //  内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  // history: createRouter(),
  routes, // `routes: routes` 的缩写
})

export default router