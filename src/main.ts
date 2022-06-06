import { createApp } from 'vue'
import App from './App.vue'
import store from '~/store'
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'layouts-generated'
import generatedRoutes from 'pages-generated'
import localCache from '~/utils/cache'
import { message, notification } from 'ant-design-vue'

import 'ant-design-vue/dist/antd.less'
import 'virtual:windi.css'
import './styles/main.less'

import { requestMomentLook, getUserDetail } from '~/api'

// 引入animatecss
;(async () => {
  //  防止浏览器第一次登陆卡死   给一个未登录的token

  if (!localCache.getCache('user')) {
    localCache.setCache('user', {
      token: 'unLogin'
    })

    return
  }

  const app = createApp(App)

  const routes = setupLayouts(generatedRoutes)

  const router = createRouter({
    history: createWebHistory(),
    routes: [
      ...routes,
      {
        path: '/back',
        name: '网站核心技术',
        components: () => import('~/pages/back/index.vue'),
        children: [
          {
            path: '/back/info',
            name: '网站信息统计',
            component: () => import('~/pages/back/info/index.vue')
          },
          {
            path: '/back/users',
            name: '用户管理',
            component: () => import('~/pages/back/users/index.vue')
          },
          {
            path: '/back/moment',
            name: '文章管理',
            component: () => import('~/pages/back/moment/index.vue')
          },
          {
            path: '/back/comment',
            name: '评论管理',
            component: () => import('~/pages/back/comment/index.vue')
          },
          {
            path: '/back/message',
            name: '留言管理',
            component: () => import('~/pages/back/message/index.vue')
          },
          {
            path: '/back/look',
            name: '浏览记录',
            component: () => import('~/pages/back/look/index.vue')
          },
          {
            path: '/back/like',
            name: '点赞记录',
            component: () => import('~/pages/back/like/index.vue')
          }
        ]
      }
    ]
  })

  router.beforeEach((to) => {
    const [, firstPath, secondPath] = to.path.split('/')

    const { token } = localCache.getCache('user') || {
      token: 'unLogin'
    }

    if (
      firstPath === 'user' ||
      firstPath === 'createBlog' ||
      firstPath === 'editBlog'
    ) {
      if (token === 'unLogin') {
        message.error('未登录，正在跳转到登录页...', 1)
        return '/login'
      }
    }

    if (firstPath === 'back') {
      const { id } = localCache.getCache('user')

      // 提示框
      const openNotification = () => {
        // notification.open({
        //   message: `你好,管理员：${nickname}`,
        //   description: '欢迎来到ISAW后台管理系统'
        // })
      }

      getUserDetail(id).then((res) => {
        const type = res.data?.type!

        if (type !== 9) {
          message.error('您不是管理员， 无法进入后台管理系统', 1)
          message.warn('正在跳转到首页...', 1)

          router.push('/')

          return
        }

        openNotification()
      })
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
