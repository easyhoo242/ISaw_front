<template>
  <UserForm>
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
        <a-form-item class="mt-10">
          <input
            class="submit w-full font-bold text-stroke-cool-light-50 text-center py-2 rounded-lg"
            value="登 录"
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
import localCache from '~/utils/cache'
import { requestUserLogin, IUserType } from '~/api'
import { message } from 'ant-design-vue'

interface FormState {
  username: string
  password: string
  remember: boolean
}
export default defineComponent({
  setup() {
    const router = useRouter()
    const formState = reactive<FormState>({
      username: '',
      password: '',
      remember: true
    })

    const setToken = (flag: boolean, token: string) => {
      if (!flag) {
        return
      }

      localCache.setCache('token', token)
      router.push('/')
    }

    const userLogin = async () => {
      const loginData: IUserType = {
        username: formState.username,
        password: formState.password
      }

      const { flag, data, msg } = await requestUserLogin(loginData)

      if (!flag) {
        console.log(msg)
        message.warn(msg, 3)
      } else {
        setToken(flag, data.token)
        message.success(msg, 3)
      }
    }

    const onFinish = () => userLogin()

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
