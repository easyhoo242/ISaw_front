<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="py-4 text-base text-gray-200 text-center">
        ISaw 后台管理系统
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <user-outlined />
          <span>网站信息统计</span>
        </a-menu-item>
        <a-menu-item key="2">
          <user-outlined />
          <span>用户管理</span>
        </a-menu-item>
        <a-menu-item key="3">
          <desktop-outlined />
          <span>文章管理</span>
        </a-menu-item>
        <a-menu-item key="4">
          <desktop-outlined />
          <span>评论管理</span>
        </a-menu-item>

        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <team-outlined />
              <span>Team</span>
            </span>
          </template>
          <a-menu-item key="6">Team 1</a-menu-item>
          <a-menu-item key="8">Team 2</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="9">
          <file-outlined />
          <span>123</span>
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
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          Bill is a cat.
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
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined
} from '@ant-design/icons-vue'
import NavHeader from '~/components/page/back/NavHeader/index.vue'

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

    return {
      collapsed: ref<boolean>(false),
      selectedKeys: ref<string[]>(['1']),
      handleFoldChange
    }
  }
})
</script>
<style>
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

<route lang="yaml">
meta:
  layout: back
</route>
