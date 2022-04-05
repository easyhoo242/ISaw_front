<template>
  <div class="flex items-center overflow-hidden">
    <div class="logo flex-0 h-10 w-10 mr-4 rounded-full overflow-hidden">
      <img
        src="https://q2.qlogo.cn/headimg_dl?dst_uin=11866529&spec=100"
        alt="打不倒的肥猫"
        class="h-full w-full"
      />
    </div>

    <div class="content flex-1">
      <div class="content-text w-55 text-sm font-bold mb-2px">
        好东西学习了教程非常明细， 好东西学习了教程非常明细，
      </div>
      <div class="text-xs flex items-center">
        <span class="pr-2 font-bold">打不倒的肥猫</span>
        2022-04-02
      </div>
    </div>
  </div>
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
.content-text {
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
