<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider
      v-model:collapsed="collapsed"
      collapsible
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
    >
      <div class="py-4 text-base text-gray-200 text-center">
        {{ !collapsed ? 'ISaw 后台管理系统' : 'ISaw' }}
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item
          v-for="item in currentMenu"
          :key="item.key"
          class="h-17 flex items-center"
          @click="handleMenuItemClick(item.url)"
        >
          <CodepenSquareFilled v-if="item.key === '1'" />
          <BarChartOutlined v-if="item.key === '2'" />
          <UserOutlined v-if="item.key === '3'" />
          <SnippetsFilled v-if="item.key === '4'" />
          <ProjectFilled v-if="item.key === '5'" />
          <FireFilled v-if="item.key === '6'" />
          <LikeFilled v-if="item.key === '7'" />
          <span class="pl-2">{{ item.label }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout :style="{ marginLeft: !collapsed ? '200px' : '80px' }">
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>后台管理 </a-breadcrumb-item>
          <a-breadcrumb-item>{{ branchValue }}</a-breadcrumb-item>
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
import { defineComponent, ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import localcache from '~/utils/cache'
import NavHeader from '~/components/page/back/NavHeader/index.vue'
import {
  PieChartOutlined,
  BarChartOutlined,
  DesktopOutlined,
  SnippetsFilled,
  FireFilled,
  ContainerFilled,
  CodepenSquareFilled,
  LikeFilled,
  UserOutlined,
  TeamOutlined,
  ProjectFilled
} from '@ant-design/icons-vue'

export default defineComponent({
  components: {
    PieChartOutlined,
    BarChartOutlined,
    DesktopOutlined,
    SnippetsFilled,
    ContainerFilled,
    FireFilled,
    CodepenSquareFilled,
    LikeFilled,
    UserOutlined,
    TeamOutlined,
    ProjectFilled,
    NavHeader
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const isCollapse = ref(false)

    const handleFoldChange = (isFold: boolean) => {
      isCollapse.value = isFold
    }

    const selectedKeys = ref<string[]>(['1'])

    localcache.setCache('backSelectKeys', selectedKeys.value)

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
        label: '留言管理',
        url: '/back/message'
      },
      {
        key: '6',
        label: '浏览记录',
        url: '/back/look'
      },
      {
        key: '7',
        label: '点赞记录',
        url: '/back/like'
      }
    ]

    const branchValue = ref('')

    const handleMenuItemClick = (url: string) => router.push(url)

    const path = computed(() => route.path)

    watch(
      () => path.value,
      () => {
        currentMenu.forEach((res) => {
          if (res.url === path.value) {
            branchValue.value = res.label
          }
        })
      }
    )

    onMounted(() => {
      selectedKeys.value = localcache.getCache('backSelectKeys') || ['1']
    })

    return {
      collapsed: ref<boolean>(false),
      selectedKeys,
      currentMenu,
      handleFoldChange,
      handleMenuItemClick,
      branchValue
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
