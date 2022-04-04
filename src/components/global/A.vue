<template>
  <a :href="href" :target="target">
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
