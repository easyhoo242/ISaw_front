<template>
  <div
    class="login-box w-90 bg-white absolute right-150 top-40 rounded-lg py-8 px-3"
  >
    <header class="text-center text-xl font-bold mb-3">
      {{ type === 'login' ? '登录' : '注册' }}
    </header>
    <slot name="default" />

    <footer class="py-2 mx-4 px-2 rounded-lg flex justify-between items-center">
      <A href="/" class="font-bold to-">ISaw</A>

      <A :href="type === 'login' ? '/register' : '/login'" class="to-form">
        {{ type === 'login' ? '注册账号' : '已有帐号？' }}
      </A>
    </footer>
  </div>
</template>

<route lang="yaml">
meta:
  layout: login
</route>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'login'
    }
  }
})
</script>

<style scoped>
.login-box {
  box-shadow: 4px 9px 29px 1px rgba(0, 0, 0, 0.61);
}

header {
  letter-spacing: 1rem;
}

footer {
  background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  background-size: 400%;
}

footer:hover {
  animation: joker 8s infinite;
}

footer:hover .to-form,
footer:hover .to- {
  color: rgba(255, 255, 255, 0.774);
}

@keyframes joker {
  100% {
    background-position: 400% 0;
  }
}
</style>
