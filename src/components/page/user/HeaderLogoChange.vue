<template>
  <Module title="修改头像">
    <div class="mt-5 flex items-center justify-center">
      <a-upload
        v-model:file-list="fileList"
        :show-upload-list="false"
        :before-upload="beforeUpload"
        :customRequest="customImageRequest"
        name="avatar"
        list-type="picture-card"
        accept="image/*"
        class="avatar-uploader"
        @change="handleChange"
      >
        <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
        <div v-else>
          <loading-outlined v-if="loading"></loading-outlined>
          <plus-outlined v-else></plus-outlined>
          <div class="ant-upload-text">Upload</div>
        </div>
      </a-upload>
    </div>
  </Module>
</template>
<script lang="ts">
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { uploadAvatar } from '~/api'
import localcache from '~/utils/cache'
import { message } from 'ant-design-vue'
import { defineComponent, ref } from 'vue'
// @ts-ignore
import type { UploadChangeParam, UploadProps } from 'ant-design-vue'

function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}
export default defineComponent({
  components: {
    LoadingOutlined,
    PlusOutlined
  },
  emits: ['change'],
  setup(_, { emit }) {
    const fileList = ref([])
    const loading = ref<boolean>(false)
    const imageUrl = ref<string>('')

    const handleChange = (info: UploadChangeParam) => {
      if (info.file.status === 'uploading') {
        loading.value = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (base64Url: string) => {
          imageUrl.value = base64Url
          loading.value = false
        })
      }
      if (info.file.status === 'error') {
        loading.value = false
        message.error('upload error')
      }
    }

    // @ts-ignore
    const beforeUpload = (file: UploadProps['fileList'][number]) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    }

    return {
      fileList,
      loading,
      imageUrl,
      handleChange,
      beforeUpload,
      token: localcache.getCache('user').token || ''!,
      customImageRequest(info: any) {
        const { file } = info
        // blob方式预览图片

        const formData = new FormData()
        formData.append('avatar', file)

        // 发送请求
        uploadAvatar(formData)
          .then((res) => {
            console.log(res)
            message.success('上传成功,请刷新页面查看新头像结果')
            emit('change')
          })
          .catch(() => {
            message.warning('上传失败')
          })
      }
    }
  }
})
</script>
<style>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.ant-upload-picture-card-wrapper {
  margin: 0 auto;
  width: 50%;
}
</style>
