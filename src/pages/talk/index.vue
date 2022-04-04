<template>
  <BranchCrumb route="闲言碎语" />
  <div class="module-list grid grid-cols-4 gap-3">
    <TalkItem v-for="item in 12" :key="item" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: fullpage
</route>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: '闲言碎语',
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped></style>
