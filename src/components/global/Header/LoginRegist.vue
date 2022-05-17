<template>
  <div
    class="btn-box w-25 h-32px rounded-full text-xs grid grid-cols-2 overflow-hidden ml-2"
  >
    <A href="/register" class="btn regist">注册</A>

    <a-popover placement="bottom">
      <template #content> 使用其他账号登录 </template>

      <div @click="handlePush" class="btn login">
        {{ isLogin ? '切换' : '登录' }}
      </div>
    </a-popover>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import localcache from '~/utils/cache'

export default defineComponent({
  setup() {
    const router = useRouter()
    const isLogin = ref(true)

    const userInfo = localcache.getCache('user') || {}

    if (!userInfo?.token) {
      isLogin.value = true
    }

    const handlePush = () => {
      if (isLogin.value) {
        // console.log(userInfo)
        // localcache.deleteCache('user')
      } else {
      }

      router.push('/login')
    }

    return {
      isLogin,
      handlePush
    }
  }
})
</script>

<style lang="less" scoped>
.btn-box {
  border: 1px solid #448ef6;
  .btn {
    cursor: pointer;
    line-height: 31px;
    text-align: center;

    &.regist {
      color: #448ef6;
    }

    &.login {
      padding-left: 5px;
      padding-right: 5px;
      color: white;
      background-color: #448ef6;
    }
  }
}
</style>
