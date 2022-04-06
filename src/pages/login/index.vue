<template>
  <div
    class="login-box w-90 bg-white absolute right-100 top-40 rounded-lg py-8 px-3"
  >
    <header class="text-center text-xl font-bold mb-3">登录</header>

    <section class="user">
      <a-form
        :model="formState"
        name="basic"
        autocomplete="off"
        layout="vertical"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
        class="mt-5 px-4"
      >
        <a-form-item
          label="用户名"
          name="username"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item name="remember">
          <div class="flex items-center justify-between">
            <a-checkbox v-model:checked="formState.remember">
              记住密码
            </a-checkbox>
            <div><A>忘记密码</A></div>
          </div>
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 9, span: 16 }" class="mt-10">
          <a-button type="primary" shape="round" html-type="submit">
            登 录
          </a-button>
        </a-form-item>
      </a-form>
    </section>
  </div>
</template>

<route lang="yaml">
meta:
  layout: login
</route>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

interface FormState {
  username: string
  password: string
  remember: boolean
}
export default defineComponent({
  setup() {
    const formState = reactive<FormState>({
      username: '',
      password: '',
      remember: true
    })
    const onFinish = (values: any) => {
      console.log('Success:', values)
    }

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo)
    }

    return {
      formState,
      onFinish,
      onFinishFailed
    }
  }
})
</script>

<style lang="less" scoped>
.login-box {
  box-shadow: 4px 9px 29px 1px rgba(0, 0, 0, 0.61);
  -webkit-box-shadow: 4px 9px 29px 1px rgba(0, 0, 0, 0.61);
  -moz-box-shadow: 4px 9px 29px 1px rgba(0, 0, 0, 0.61);

  header {
    letter-spacing: 1rem;
  }
}
</style>
