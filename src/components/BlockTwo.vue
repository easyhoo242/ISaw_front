<template>
  <div class="w-full mt-4 min-h-80 shadow-lg bg-white p-10">
    <a-button type="primary" shape="round" size="large" class="mb-2 mr-2 ">
      操作按钮
    </a-button>

    <a-button
      type="primary"
      shape="round"
      size="large"
      class="mb-2"
      @click="toggleTheme"
    >
      切换主题
    </a-button>

    <h1 class="text-lg font-semibold">BlockTwo</h1>
  </div>
</template>

<script lang="ts" setup>
import { useToggleTheme } from '~/hooks'

const { toggleTheme } = useToggleTheme('red')
</script>
