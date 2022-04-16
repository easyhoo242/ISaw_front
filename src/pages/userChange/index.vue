<template>
  <div>
    <FlexCol>
      <template #body>
        <Module title="个人信息修改">
          <div class="mt-10">
            <a-form
              :model="formState"
              v-bind="layout"
              name="nest-messages"
              :validate-messages="{
                required: '不能为空',
                types: {
                  email: '不是一个有效的邮箱',
                  number: '不能只输入数字'
                },
                number: {
                  range: '必须介与1~99'
                }
              }"
              @finish="onFinish"
            >
              <a-form-item
                :name="['user', 'name']"
                label="昵称"
                :rules="[{ required: true }]"
              >
                <a-input v-model:value="formState.user.name" />
              </a-form-item>
              <a-form-item
                :name="['user', 'email']"
                label="邮箱"
                :rules="[{ type: 'email' }]"
              >
                <a-input v-model:value="formState.user.email" />
              </a-form-item>

              <a-form-item label="性别">
                <a-radio-group v-model:value="formState.user.sex">
                  <a-radio value="'1'">男</a-radio>
                  <a-radio value="'2'">女</a-radio>
                </a-radio-group>
              </a-form-item>

              <a-form-item
                :name="['user', 'age']"
                label="年龄"
                :rules="[{ type: 'number', min: 0, max: 99 }]"
              >
                <a-input-number v-model:value="formState.user.age" />
              </a-form-item>

              <a-form-item :name="['user', 'website']" label="电话">
                <a-input v-model:value="formState.user.telPhone" />
              </a-form-item>

              <a-form-item :name="['user', 'introduction']" label="简介">
                <a-textarea v-model:value="formState.user.desc" />
              </a-form-item>

              <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
                <a-button type="primary" html-type="submit">提交</a-button>
              </a-form-item>
            </a-form>
          </div>
        </Module>
      </template>
      <template #side>
        <HeadLogo />
      </template>
    </FlexCol>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { changeUserInfo } from '~/api'
import { handleUserLogin } from '~/hooks/userLogin'
import type { IChangeUserInfo } from '~/api'
import cache from '~/utils/cache'
import { message } from 'ant-design-vue'

export default defineComponent({
  inject: ['reload'],
  setup() {
    const router = useRouter()

    const userInfo = cache.getCache('user')
    const account = cache.getCache('account')

    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 }
    }

    const formState = reactive({
      user: {
        name: '',
        sex: '',
        age: undefined,
        email: '',
        telPhone: '',
        desc: ''
      }
    })

    const onFinish = async () => {
      console.log(formState.user.name)

      const data: IChangeUserInfo = {
        name: formState.user.name || 'ISaw~',
        email: formState.user.email || 'xxx@xxx.com',
        sex: formState.user.sex || '1',
        age: formState.user.age || 18,
        telPhone: formState.user.telPhone || '1xxxxxxxxxx',
        slogan: formState.user.desc || '这个人还没有备注哦~',
        userId: userInfo.id
      }

      const res = await changeUserInfo(data)

      if (!res.flag) {
        message.error('修改失败', 3)
      }

      message.success('个人信息修改成功~', 3)

      await handleUserLogin({
        username: account.username,
        password: account.password
      })

      router.push('/user')
    }
    return {
      formState,
      onFinish,
      layout
    }
  }
})
</script>

<style scoped></style>
