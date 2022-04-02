<template>
  <div class="module p-15px bg-white dark:bg-gray-900 rounded-lg shadow-md p-4">
    <div v-if="title" class="title text-lg mx-2.5 pb-2.5 font-bold border-b-1">{{ title }}</div>
    <slot name="default" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="less" scoped></style>
