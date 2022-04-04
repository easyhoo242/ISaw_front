<template>
  <div>
    <a-breadcrumb>
      <a-breadcrumb-item><a href="/">首页</a></a-breadcrumb-item>
      <a-breadcrumb-item class="active" v-if="route">
        {{ route }}
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    route: {
      type: String,
      default: ''
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.active {
  user-select: none;
}
</style>
