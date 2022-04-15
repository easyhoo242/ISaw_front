<template>
  <router-view v-if="isRouterAlive" />
</template>

<script lang="ts">
import { defineComponent, ref, provide, nextTick } from 'vue'

export default defineComponent({
  setup() {
    const isRouterAlive = ref(true)

    const reload = () => {
      isRouterAlive.value = false

      nextTick(() => {
        isRouterAlive.value = true
      })
    }

    provide('reload', reload)

    return {
      isRouterAlive
    }
  }
})
</script>
