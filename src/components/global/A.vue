<template>
  <a :href="href" :target="target" class="dark:text-dark-400">
    <slot name="default"></slot>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    href: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: ''
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
