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

import { requestMomentLook } from '~/api'

// 引入animatecss
import { count } from 'console'
;(async () => {
  const app = createApp(App)

  const routes = setupLayouts(generatedRoutes)

  const router = createRouter({
    history: createWebHistory(),
    routes
  })

  router.beforeEach((to) => {
    if (to.path !== '/login' && to.path != '/register') {
      const { token } = localCache.getCache('user')

      if (!token) {
        message.error('未登录，正在跳转到登录页...', 2)
        return '/login'
      }
    }

    const [, item, id] = to.path.split('/')
    const userId: number = (localCache.getCache('user').id as number) || 38

    item === 'blog' && requestMomentLook(parseInt(id), userId)
  })

  function countFn() {
    let count = 0

    return {
      incrementCount() {
        count++
      },
      getCount() {
        return count
      }
    }
  }

  // @ts-ignore
  window.countObj = countFn()

  app.mixin({
    mounted() {
      // @ts-ignore
      window?.countObj.incrementCount()
    }
  })

  app.use(store)

  app.use(router)

  // Configure vuex store

  app.mount('#app', true)
})()
