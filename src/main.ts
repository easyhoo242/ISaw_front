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

    // if (to.path.indexOf('/main') !== -1) {
    //   if (to.name === 'notFound') {
    //     to.name = 'user'
    //   }
    // }
  })

  app.use(router)

  // Configure vuex store
  app.use(store)

  app.mount('#app', true)
})()
