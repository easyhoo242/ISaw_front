<template>
  <div
    class="flex justify-between w-full h-24 p-4 enter-x bg-white dark:bg-gray-900 rounded-lg shadow-md"
  >
    <div class="flex flex-row w-2/3 justify-between items-center">
      <div class="w-1/2">
        <h1 class="text-lg font-semibold">{{ sayHi }},</h1>
        <p class="mb-0">
          {{ `欢迎回来，${userInfo?.nickname || nickname} 😊` }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import localcache from '~/utils/cache'

const store = useStore()
const userInfo = computed(() => store.state.user)

const { nickname } = localcache.getCache('user') || { nickname: 'ISawer' }

const today = ref<Date>(new Date())
const sayHi = computed(() => {
  const currentHour = today.value.getHours()
  return currentHour < 12 ? '早上好' : currentHour < 18 ? '下午好' : '晚上好'
})
</script>
