<template>
  <Module title="热门文章" corner class="mt-3">
    <div class="content mt-3">
      <div v-for="item in 3" :key="item" class="content-item mb-2.5">123</div>
    </div>
  </Module>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
