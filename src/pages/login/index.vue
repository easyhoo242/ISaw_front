<template>
  <UserForm>
    <section class="user">
      <a-form
        :model="formState"
        name="basic"
        autocomplete="on"
        layout="vertical"
        @finish="onFinish"
        class="mt-5 px-4"
      >
        <a-form-item
          label="用户名"
          :name="['user', 'username']"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <a-input v-model:value="formState.user.username" />
        </a-form-item>

        <a-form-item
          label="密码"
          :name="['user', 'password']"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <a-input-password v-model:value="formState.user.password" />
        </a-form-item>

        <a-form-item :name="['user', 'password']">
          <div class="flex items-center justify-between">
            <a-checkbox v-model:checked="formState.user.remember">
              记住密码
            </a-checkbox>
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
import type { IAccount } from '~/api'
import { handleUserLogin } from '~/hooks/userLogin'

interface FormState {
  user: {
    username: string
    password: string
    remember: boolean
  }
}

export default defineComponent({
  setup() {
    const router = useRouter()

    const formState = reactive<FormState>({
      user: {
        username: '',
        password: '',
        remember: true
      }
    })

    const onFinish = async () => {
      // console.log(value)

      const data: IAccount = {
        username: formState.user.username,
        password: formState.user.password
      }

      const flag = await handleUserLogin(data)

      flag && router.push('/')
    }

    return {
      formState,
      onFinish
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
