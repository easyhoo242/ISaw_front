<template>
  <FlexCol>
    <template #body>
      <Module>
        <div class="text-left text-lg mx-2.5 pb-2.5 font-bold">标题</div>
        <a-input
          v-model:value="blogTitle"
          class="text-center"
          size="large"
          placeholder="请输入标题..."
        />
      </Module>
      <Module>
        <div class="text-left text-lg mx-2.5 pb-2.5 font-bold">正文</div>

        <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="mode"
        />

        <Editor
          style="height: 500px; overflow-y: hidden"
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
        />
      </Module>

      <Module title="上传封面">
        <div class="pt-2 pl-2">
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
          <a-modal
            :visible="previewVisible"
            :title="previewTitle"
            :footer="null"
            @cancel="handleCancel"
          >
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </div>
      </Module>
    </template>

    <template #side>
      <TagList :data="blogType" @emitData="handleGetBlogType" />

      <Module class="flex items-center justify-between">
        <div class="edit py-6px px-15px rounded-md" @click="handleQuitEdit">
          退出编辑
        </div>
        <div class="edit py-6px px-15px rounded-md" @click="handleEditBlog">
          发布
        </div>

        <a-modal
          v-model:visible="visible"
          title="提示"
          ok-text="保存"
          cancel-text="不保存"
          @ok="saveEdit"
          @cancel="nosaveEdit"
        >
          <p>是否保存草稿</p>
        </a-modal>
      </Module>

      <Module v-if="edited.data.title">
        <a-button type="" @click="isShowEdited = !isShowEdited"
          >查看上次编辑的内容</a-button
        >
      </Module>

      <Module v-show="isShowEdited" class="enter-x">
        <h1>标题</h1>
        <p>{{ edited.data.title || '' }}</p>
        <hr />
        <h2 class="mt-3">内容</h2>
        <div v-html="edited.data.content || ''" />
      </Module>
    </template>
  </FlexCol>
</template>

<script lang="ts">
import { onBeforeUnmount, ref, reactive, shallowRef, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { requestMomentDetail, requestMomentEdit } from '~/api'
import type { ICreateMoment, IMomentType } from '~/api'
import cache from '~/utils/cache'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { message } from 'ant-design-vue'

// 上传封面
import { PlusOutlined } from '@ant-design/icons-vue'
//@ts-ignore
import { UploadProps } from 'ant-design-vue'

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

export default {
  components: { Editor, Toolbar, PlusOutlined },
  setup() {
    const router = useRouter()
    const route = useRoute()

    const blogId = parseInt(route.query.id as string)

    const blogTitle = ref('')

    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    const valueHtml = ref('')

    // 模拟 ajax 异步获取内容

    const toolbarConfig = {}
    const editorConfig = { placeholder: '请输入内容...' }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    const handleCreated = (editor: any) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    // 获取文章类型
    const blogType = ref(0)

    const handleGetBlogType = (id: number, name: string) => {
      blogType.value = id
    }

    // 上传封面
    const previewVisible = ref(false)
    const previewImage = ref('')
    const previewTitle = ref('')

    //@ts-ignore
    const fileList = ref<UploadProps['fileList']>([
      // {
      //   uid: '-1',
      //   name: 'image.png',
      //   status: 'done',
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      // }
    ])

    const handleCancel = () => {
      previewVisible.value = false
      previewTitle.value = ''
    }
    //@ts-ignore
    const handlePreview = async (file: UploadProps['fileList'][number]) => {
      if (!file.url && !file.preview) {
        file.preview = (await getBase64(file.originFileObj)) as string
      }
      previewImage.value = file.url || file.preview
      previewVisible.value = true
      previewTitle.value =
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    }

    // 文章内容
    const visible = ref<boolean>(false)

    const handleQuitEdit = () => {
      visible.value = true
    }

    const saveEdit = () => {
      cache.setCache('editingBlog', {
        title: blogTitle.value,
        content: valueHtml.value,
        type: blogType.value
      })

      const isSave = cache.getCache('editingBlog')

      if (isSave) {
        message.success('保存成功')
        setTimeout(() => {
          message.success('正在为您跳转到首页...')
          router.push('/')
        }, 1000)
      }
      visible.value = false
    }

    const nosaveEdit = () => {
      message.success('正在为您跳转到首页...', 2)

      setTimeout(() => {
        router.push('/')
      }, 1000)
    }

    // 发表文章
    const handleEditBlog = async () => {
      if (!blogTitle.value) {
        message.warn('标题不能为空')
        return
      }

      if (!valueHtml.value) {
        message.warn('正文不能为空')
        return
      }

      if (!blogType.value) {
        message.warn('请选择文章类型')
        return
      }

      const data: ICreateMoment = {
        title: blogTitle.value,
        content: valueHtml.value,
        label: blogType.value
      }

      cache.setCache('editingBlog', data)

      const res = await requestMomentEdit(blogId, data)

      console.log(res)

      if (!res.flag) {
        message.error(res.msg, 2)
        return
      }

      message.success(res.msg, 2)

      setTimeout(() => {
        router.push('/blog/' + blogId)
      }, 1000)
    }

    // 获取文章并将其展示在富文本编译器上
    const getData = async () => {
      const res = await requestMomentDetail(blogId)

      res.momentId && cache.setCache('editMoment', res)

      const result: IMomentType = cache.getCache('editMoment')

      if (!result.momentId) {
        message.error('文章获取失败！', 3)
        return
      }

      blogTitle.value = result.title
      blogType.value = result.label.id

      setTimeout(() => {
        // valueHtml.value = '<div>' + result.content + '</div>'
        valueHtml.value = result.content
      }, 500)
    }

    onMounted(() => {
      getData()
    })

    // 草稿框
    const edited = reactive<{ data: { title: string; content: string } }>({
      data: {
        title: '',
        content: ''
      }
    })

    edited.data = cache.getCache('editingBlog') || { title: '', contnet: '' }

    const isShowEdited = ref(false)

    return {
      blogTitle,
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      // 选择标签
      blogType,
      handleGetBlogType,
      handleClick() {},
      // 上传封面部分
      previewVisible,
      previewImage,
      fileList,
      handleCancel,
      handlePreview,
      // 保存文章
      previewTitle,
      visible,
      handleQuitEdit,
      saveEdit,
      handleEditBlog,
      edited,
      isShowEdited,
      // 编辑文章
      nosaveEdit
    }
  }
}
</script>

<style lang="less" scoped>
.edit {
  cursor: pointer;
  padding: 5px;
  text-align: center;
  background-color: #fafafa;
  transition: ease-in-out 0.3s;

  &:hover {
    background-color: #87ceeb99;
    color: white;
    transition: ease-in-out 0.3s;
  }
}
</style>
