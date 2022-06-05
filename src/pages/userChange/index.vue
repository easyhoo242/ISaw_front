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

              <a-form-item
                :name="['user', 'telPhone']"
                :rules="{
                  pattern: phoneRule,
                  message: '请输入正确的电话'
                }"
                label="电话"
              >
                <a-input v-model:value="formState.user.telPhone" />
              </a-form-item>

              <a-form-item
                :name="['user', 'email']"
                :rules="[
                  {
                    pattern: emailRule,
                    message: '输入正确的邮箱格式'
                  }
                ]"
                label="邮箱"
              >
                <a-input v-model:value="formState.user.email" />
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
            <a-form-item
              :name="['userPsw', 'oldPsw']"
              label="旧密码"
              :rules="[{ required: true, message: '不能为空' }]"
            >
              <a-input-password v-model:value="formState.userPsw.oldPsw" />
            </a-form-item>

            <a-form-item
              :name="['userPsw', 'newPsw']"
              label="新密码"
              :rules="[
                { required: true, message: '新密码不能为空' },
                {
                  pattern: passwordRule,
                  message: '4~16位的字母和数字组成'
                }
              ]"
            >
              <a-input-password v-model:value="formState.userPsw.newPsw" />
            </a-form-item>

            <a-form-item
              :name="['userPsw', 'reNewPsw']"
              label="确认新密码"
              :rules="[
                { required: true, message: '新密码不能为空' },
                { pattern: passwordRule, message: '4~16位的字母和数字组成' }
              ]"
            >
              <a-input-password v-model:value="formState.userPsw.reNewPsw" />
            </a-form-item>

            <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 10 }">
              <a-button type="primary" html-type="submit">提交</a-button>
            </a-form-item>
          </a-form>
        </Module>
      </template>
      <template #side>
        <HeadLogo />

        <HeaderLogoChange />
      </template>
    </FlexCol>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  changeUserInfo,
  getUserDetail,
  changeUserPsw,
  passwordRule,
  phoneRule,
  emailRule
} from '~/api'
import type { IUser, IChangePsw } from '~/api'
import localCache from '~/utils/cache'
// 引用组件
import { message } from 'ant-design-vue'
import HeaderLogoChange from '~/components/page/user/HeaderLogoChange.vue'

interface IUserPsw {
  oldPsw: string
  newPsw: string
  reNewPsw: string
}

interface IFormState {
  user: IUser
  userPsw: IUserPsw
}

export default defineComponent({
  components: {
    HeaderLogoChange
  },
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
        oldPsw: '',
        newPsw: '',
        reNewPsw: ''
      }
    })

    const getData = async () => {
      const res = await getUserDetail(userInfo.id)
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

      console.log(data)

      // 个人信息修成功后将信息存储到localStorage
      localCache.setCache('userDetail', data)

      router.push(`/user/${userInfo.id}`)
    }

    const onPswFinish = async () => {
      const { oldPsw, newPsw, reNewPsw } = formState.userPsw

      if (!(newPsw === reNewPsw)) {
        message.error('两次密码不一致~')
        return
      }

      const data: IChangePsw = {
        oldPsw,
        newPsw
      }

      const res = await changeUserPsw(userInfo.id, data)

      if (!res.flag) {
        message.error(res.msg, 3)
        return
      }

      message.success(res.msg, 3)
    }

    onMounted(() => {
      getData()
    })

    return {
      formState,
      onFinish,
      onPswFinish,
      layout,
      passwordRule,
      phoneRule,
      emailRule
    }
  }
})
</script>

<style scoped></style>
