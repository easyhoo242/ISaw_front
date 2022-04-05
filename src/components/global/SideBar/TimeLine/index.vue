<template>
  <Module title="时间轴" corner class="mt-3 pb-0">
    <div class="mt-3 pt-2 px-3">
      <a-timeline>
        <a-timeline-item color="green">
          <Message />
        </a-timeline-item>
        <a-timeline-item color="green">
          <Message />
        </a-timeline-item>
        <a-timeline-item color="red">
          <Message />
        </a-timeline-item>
        <a-timeline-item>
          <Message />
        </a-timeline-item>
      </a-timeline>
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

<style lang="less" scoped></style>
