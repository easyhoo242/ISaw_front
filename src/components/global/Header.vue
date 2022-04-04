<template>
  <header class="flex bg-white shadow-md">
    <div
      class="flex items-center justify-center w-full h-56px border-gray-100 dark:bg-gray-900 dark:border-b-0 border-b-1"
    >
      <div class="w-1400px flex items-center justify-between">
        <!-- 左边 -->
        <div class="flex items-center">
          <div class="flex-0 flex mr-10">
            <logos:webplatform class="text-2xl mr-3" />
            <span class="text-blue-900 dark:text-white font-bold text-xl">
              ISaw
            </span>
          </div>
          <a-tabs v-model:activeKey="activeKey" class="flex-1 h-56px">
            <a-tab-pane key="/">
              <template #tab>
                <div class="py-2">
                  <dashicons:index-card class="mr-2" />
                  <strong class="align-top">首页</strong>
                </div>
              </template>
            </a-tab-pane>
            <a-tab-pane key="/about">
              <template #tab>
                <span class="py-2">
                  <gg:menu-boxed class="mr-2" />
                  <strong class="align-top">互联网</strong>
                </span>
              </template>
            </a-tab-pane>
            <a-tab-pane key="/talk">
              <template #tab>
                <span class="py-2">
                  <gg:menu-boxed class="mr-2" />
                  <strong class="align-top">随便看看</strong>
                </span>
              </template>
            </a-tab-pane>
          </a-tabs>
        </div>

        <!-- 右边 -->
        <div class="flex-0">
          <a-switch
            v-model:checked="darkSwitch"
            class="bg-purple-500 my-switch"
          >
            <template #checkedChildren>
              <noto-v1:sun-with-face class="mt-0.5" />
            </template>
            <template #unCheckedChildren>
              <noto-v1:last-quarter-moon-face class="mt-0.5" />
            </template>
          </a-switch>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { watch, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useToggleDark } from '~/hooks'

const { isDark, toggleDark } = useToggleDark()
const router = useRouter()
const store = useStore()

//tab相关逻辑
const activeKey = ref('/')
watch(activeKey, (activeKey) => {
  router.push(activeKey)
})

//暗黑模式开关逻辑
const darkSwitch = ref(isDark.value)
watch(darkSwitch, () => {
  toggleDark()
})

onMounted(() => {
  activeKey.value = router.currentRoute.value.path
  store.dispatch('actionGetUserInfo')
})
</script>
