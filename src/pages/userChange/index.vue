<template>
  <div>
    <FlexCol>
      <template #body>
        <Module title="个人信息修改">
          <div>
            <a-form
              :model="formState"
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
              v-bind="layout"
              name="nest-messages"
              class="mt-10"
              @finish="onFinish"
            >
              <a-form-item
                :name="['user', 'nickname']"
                label="昵称"
                :rules="[{ required: true }]"
              >
                <a-input v-model:value="formState.user.nickname" />
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
                  <a-radio value="男">男</a-radio>
                  <a-radio value="女">女</a-radio>
                  <a-radio value="保密">保密</a-radio>
                </a-radio-group>
              </a-form-item>

              <a-form-item
                :name="['user', 'age']"
                label="年龄"
                :rules="{
                  type: 'number',
                  min: 0,
                  max: 99,
                  message: '必须介与1~99'
                }"
              >
                <a-input-number v-model:value="formState.user.age" />
              </a-form-item>

              <a-form-item :name="['user', 'website']" label="电话">
                <a-input v-model:value="formState.user.telPhone" />
              </a-form-item>

              <a-form-item :name="['user', 'introduction']" label="简介">
                <a-textarea v-model:value="formState.user.desc" />
              </a-form-item>

              <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 11 }">
                <a-button type="primary" html-type="submit">提交</a-button>
              </a-form-item>
            </a-form>
          </div>
        </Module>

        <Module title="密码修改">
          <a-form
            :model="formState"
            :validate-messages="{
              required: '不能为空'
            }"
            v-bind="layout"
            name="nest-messages"
            class="mt-10"
            @finish="onPswFinish"
          >
            <a-form-item :name="['userPsw', 'old']" label="旧密码">
              <a-input v-model:value="formState.userPsw.old" />
            </a-form-item>

            <a-form-item :name="['userPsw', 'new']" label="新密码">
              <a-input v-model:value="formState.userPsw.new" />
            </a-form-item>

            <a-form-item :name="['userPsw', 'reNew']" label="确认新密码">
              <a-input v-model:value="formState.userPsw.reNew" />
            </a-form-item>

            <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 10 }">
              <a-button type="primary" html-type="submit">提交</a-button>
            </a-form-item>
          </a-form>
        </Module>
      </template>
      <template #side>
        <HeadLogo />
      </template>
    </FlexCol>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { changeUserInfo, getUserDetail } from '~/api'
import localCache from '~/utils/cache'
// 引用组件
import { message } from 'ant-design-vue'

interface IUser {
  nickname: string
  sex: string
  age: number
  email: string
  telPhone: string
  desc: string
}

interface IUserPsw {
  old: string
  new: string
  reNew: string
}

interface IFormState {
  user: IUser
  userPsw: IUserPsw
}

export default defineComponent({
  inject: ['reload'],
  setup() {
    const router = useRouter()

    const userInfo = localCache.getCache('user')

    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 }
    }

    const formState = reactive<IFormState>({
      user: {
        nickname: '',
        sex: '',
        age: 20,
        email: '',
        telPhone: '',
        desc: ''
      },
      userPsw: {
        old: '',
        new: '',
        reNew: ''
      }
    })

    const getData = async () => {
      const res = await getUserDetail(userInfo.id)
      console.log(res)
      formState.user.nickname = res.data?.nickname! || 'ISaw~'
      formState.user.sex = res.data?.sex! || '保密'
      formState.user.age = res.data?.age! || 18
      formState.user.email = res.data?.email! || 'xxx@xxx.com'
      formState.user.telPhone = res.data?.telPhone! || '1xxxxxxxxxx'
      formState.user.desc = res.data?.desc! || '还没有备注哦~'
    }

    const onFinish = async () => {
      const data: IUser = { ...formState.user }

      const res = await changeUserInfo(userInfo.id, data)

      if (!res.flag) {
        message.error('修改失败', 3)
      }

      message.success('个人信息修改成功~', 3)

      // 个人信息修成功后将信息存储到localStorage
      localCache.setCache('userDetail', data)

      router.push(`/user/${userInfo.id}`)
    }

    const onPswFinish = () => {}

    onMounted(() => {
      getData()
    })

    return {
      formState,
      onFinish,
      onPswFinish,
      layout
    }
  }
})
</script>

<style scoped></style>
