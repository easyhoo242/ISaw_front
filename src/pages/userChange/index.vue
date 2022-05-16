<template>
  <div>
    <FlexCol>
      <template #body>
        <Module title="个人信息修改">
          <div class="mt-10">
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
              class="flex items-center flex-col"
              @finish="onFinish"
            >
              <div class="mx-auto flex">
                <div class="mr-20">
                  <a-form-item
                    :name="['user', 'name']"
                    label="昵称"
                    :rules="[{ required: true }]"
                  >
                    <a-input
                      v-model:value="formState.user.name"
                      style="width: 300px"
                    />
                  </a-form-item>
                  <a-form-item
                    :name="['user', 'email']"
                    label="邮箱"
                    :rules="[{ type: 'email' }]"
                  >
                    <a-input
                      v-model:value="formState.user.email"
                      style="width: 300px"
                    />
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
                    <a-input
                      v-model:value="formState.user.telPhone"
                      style="width: 300px"
                    />
                  </a-form-item>

                  <a-form-item :name="['user', 'introduction']" label="简介">
                    <a-textarea v-model:value="formState.user.desc" />
                  </a-form-item>
                </div>

                <div>
                  <a-form-item :name="['psw', 'psw']" label="旧密码">
                    <a-input
                      v-model:value="formState.user.psw"
                      style="width: 200px"
                    />
                  </a-form-item>
                  <a-form-item :name="['newPsw', 'newPsw']" label="新密码">
                    <a-input
                      v-model:value="formState.user.newPsw"
                      style="width: 200px"
                    />
                  </a-form-item>
                  <!-- 头像 -->
                  <a-form-item
                    :name="['user', 'avatar']"
                    label="头像"
                    :rules="[{ type: 'avatar' }]"
                  >
                    <a-upload
                      v-model:file-list="fileList"
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      list-type="picture-card"
                      @preview="handlePreview"
                    >
                      <div v-if="fileList.length < 8">
                        <plus-outlined />
                        <div style="margin-top: 8px">Upload</div>
                      </div>
                    </a-upload>
                  </a-form-item>
                </div>
              </div>

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
import { defineComponent, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { changeUserInfo } from '~/api'
import type { IChangeUserInfo } from '~/api'
import cache from '~/utils/cache'
// 引用组件
import { handleUserLogin } from '~/hooks/userLogin'
import { PlusOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import type { UploadProps } from 'ant-design-vue'

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

export default defineComponent({
  components: {
    PlusOutlined
  },
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
        desc: '',
        psw: '',
        newPsw: '',
        avatar: ''
      }
    })

    const onFinish = async () => {
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

    const previewVisible = ref(false)
    const previewImage = ref('')
    const previewTitle = ref('')

    const fileList = ref<UploadProps['fileList']>([
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }
    ])

    const handleCancel = () => {
      previewVisible.value = false
      previewTitle.value = ''
    }
    const handlePreview = async (file: UploadProps['fileList'][number]) => {
      if (!file.url && !file.preview) {
        file.preview = (await getBase64(file.originFileObj)) as string
      }
      previewImage.value = file.url || file.preview
      previewVisible.value = true
      previewTitle.value =
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    }

    return {
      formState,
      onFinish,
      layout,
      previewVisible,
      previewImage,
      fileList,
      handleCancel,
      handlePreview,
      previewTitle
    }
  }
})
</script>

<style scoped></style>
