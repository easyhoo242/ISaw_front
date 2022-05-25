<template>
  <div>
    <OverView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import OverView from '~/components/page/back/overview/overview.vue'

export default defineComponent({
  components: {
    OverView
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>

<route lang="yaml">
meta:
  layout: back
</route>
