import { createApp } from 'vue'
import App from './App.vue'
import store from '~/store'
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'layouts-generated'
import generatedRoutes from 'pages-generated'

import 'ant-design-vue/dist/antd.less'
// swiper
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'virtual:windi.css'
import './styles/main.less'
;(async () => {
  const app = createApp(App)

  const routes = setupLayouts(generatedRoutes)

  const router = createRouter({
    history: createWebHistory(),
    routes
  })
  app.use(router)

  // Configure vuex store
  app.use(store)

  app.mount('#app', true)
})()
