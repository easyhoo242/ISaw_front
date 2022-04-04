<template>
  <div class="flex w-full">
    <div class="flex-1 w-1000px enter-x">
      <slot name="body"></slot>
    </div>
    <div class="w-400px flex-0 pl-5 enter-y">
      <slot name="side"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>
