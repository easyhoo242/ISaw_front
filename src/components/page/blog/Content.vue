<template>
  <Module title="正文">
    <div class="mt-5 px-5">
      <a-typography v-html="data"> </a-typography>
    </div>
  </Module>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { Typography } from 'ant-design-vue'

export default defineComponent({
  props: {
    data: {
      type: String,
      default: ''
    }
  },
  setup() {
    const contentRef = ref<InstanceType<typeof Typography>>()

    console.log(contentRef)
    return {
      contentRef
    }
  }
})
</script>

<style scoped></style>
