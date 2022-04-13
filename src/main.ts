import { createApp } from 'vue'
import App from './App.vue'
import store from '~/store'
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'layouts-generated'
import generatedRoutes from 'pages-generated'
import localCache from '~/utils/cache'
import { message } from 'ant-design-vue'

import 'ant-design-vue/dist/antd.less'
import 'virtual:windi.css'
import './styles/main.less'
// 引入animatecss
;(async () => {
  const app = createApp(App)

  const routes = setupLayouts(generatedRoutes)

  const router = createRouter({
    history: createWebHistory(),
    routes
  })

  router.beforeEach((to) => {
    if (to.path !== '/login' && to.path != '/register') {
      const token = localCache.getCache('token')
      if (!token) {
        message.error('未登录，正在跳转到登录页...', 2)
        return '/login'
      }
    }
    if (to.path === '/login') {
      const token = localCache.getCache('token')
      if (token) {
        message.warning('您当前已经登陆, 请勿重复登录~', 2)
        message.success('已为您跳转到首页~', 3)
      }
      return '/'
    }
  })
  app.use(store)

  app.use(router)

  // Configure vuex store

  app.mount('#app', true)
})()
