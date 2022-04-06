<template>
  <div
    class="btn-box w-25 h-32px rounded-full text-xs grid grid-cols-2 overflow-hidden ml-2"
  >
    <A href="/register" class="btn regist">注册</A>
    <A href="/login" class="btn login">登录</A>
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
.btn-box {
  border: 1px solid #448ef6;
  .btn {
    line-height: 31px;
    text-align: center;
    &.regist {
      color: #448ef6;
    }

    &.login {
      color: white;
      background-color: #448ef6;
    }
  }
}
</style>
