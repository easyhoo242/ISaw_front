<template>
  <Module title="个人信息操作">
    <div class="mt-3 px-3 grid grid-cols-2">
      <A
        href="/userChange"
        class="changeInfo px-3 py-2 rounded-md bg-gray-200 text-center"
      >
        修改个人信息
      </A>
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

<style lang="less" scoped>
.changeInfo {
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
}
</style>
