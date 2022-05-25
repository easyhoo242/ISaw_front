<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="py-4 text-base text-gray-200 text-center">
        ISaw 后台管理系统
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item v-for="item in currentMenu" :key="item.key">
          <pie-chart-filled />
          <router-link :to="item.url">{{ item.label }}</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" />
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '80vh' }"
        >
          <router-view v-slot="{ Component }">
            <transition
              name="fade"
              enter-active-class="transition easing-entrance duration-250"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition easing-exit duration-150"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        ISaw 后台管理系统 by 杜成
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavHeader from '~/components/page/back/NavHeader/index.vue'
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined
} from '@ant-design/icons-vue'

export default defineComponent({
  components: {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
    NavHeader
  },
  setup() {
    const isCollapse = ref(false)

    const handleFoldChange = (isFold: boolean) => {
      isCollapse.value = isFold
    }

    const handleMenuItemClick = () => {}

    const currentMenu = [
      {
        key: '1',
        label: '网站核心技术',
        url: '/back'
      },
      {
        key: '2',
        label: '网站信息统计',
        url: '/back/info'
      },
      {
        key: '3',
        label: '用户管理',
        url: '/back/users'
      },
      {
        key: '4',
        label: '文章管理',
        url: '/back/moment'
      },
      {
        key: '5',
        label: '评论管理',
        url: '/back/comment'
      },
      {
        key: '6',
        label: '网站动态',
        url: '/back/did'
      }
    ]

    return {
      collapsed: ref<boolean>(false),
      selectedKeys: ref<string[]>(['1']),
      currentMenu,
      handleFoldChange,
      handleMenuItemClick
    }
  }
})
</script>

<style lang="less" scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
