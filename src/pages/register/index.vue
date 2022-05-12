<template>
  <UserForm type="register">
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
          label="昵称"
          name="nickname"
          :rules="[{ required: true, message: '昵称不能为空~' }]"
        >
          <a-input v-model:value="formState.nickname" />
        </a-form-item>

        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item
          label="确认密码"
          name="rePassword"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <a-input-password v-model:value="formState.rePassword" />
        </a-form-item>

        <a-form-item class="mt-10">
          <input
            class="submit w-full font-bold text-stroke-cool-light-50 text-center py-2 rounded-lg"
            value="注 册"
            type="submit"
          />
        </a-form-item>
      </a-form>
    </section>
  </UserForm>
</template>

<route lang="yaml">
meta:
  layout: login
</route>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { handleUserLogin } from '~/hooks'
import { registUser } from '~/api'
import type { IAccount } from '~/api'

interface FormState {
  username: string
  password: string
  nickname: string
  rePassword: string
  remember: boolean
}

interface account extends IAccount {
  nickname: string
}

export default defineComponent({
  setup() {
    const router = useRouter()

    const formState = reactive<FormState>({
      nickname: 'ISawer~',
      username: '',
      password: '',
      rePassword: '',
      remember: true
    })

    const getData = async () => {
      const data: account = {
        nickname: formState.nickname,
        username: formState.username,
        password: formState.password
      }

      const { flag, msg } = await registUser(data)

      if (!flag) {
        message.error(msg, 2)
        return
      }

      message.success(msg, 3)

      if (await handleUserLogin(data)) {
        router.push('/')
      }
    }

    const onFinish = () => {
      if (!(formState.password === formState.rePassword)) {
        message.error('两次密码输入不一致', 3)
        return
      }

      getData()
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
