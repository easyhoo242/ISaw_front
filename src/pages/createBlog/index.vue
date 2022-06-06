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
          style="height: 700px; overflow-y: hidden"
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
        />
      </Module>

      <a-drawer
        v-model:visible="isShowEdited"
        :placement="placement"
        :width="550"
        class="custom-class"
        title="草稿"
        placement="right"
      >
        <template #extra> </template>

        <div
          :style="{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
            zIndex: 1
          }"
        >
          <a-button style="margin-right: 8px" @click="handleUseEdit">
            应用
          </a-button>
        </div>

        <div>
          <h1>标题</h1>
          <p>{{ edited?.title || '' }}</p>
          <hr />
          <h2 class="mt-3">内容</h2>
          <div v-html="edited?.content || ''" />
        </div>
      </a-drawer>
    </template>

    <template #side>
      <AboutISaw />

      <TagList :data="blogType" @emitData="handleGetBlogType" />

      <Module class="flex items-center justify-between">
        <div class="edit py-6px px-15px rounded-md" @click="handleQuitEdit">
          退出编辑
        </div>
        <div class="edit py-6px px-15px rounded-md" @click="handlePushBlog">
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

      <Module>
        <div class="flex items-center justify-between">
          <a-button type="" @click="isShowEdited = !isShowEdited">
            查看上次编辑的内容
          </a-button>
        </div>
      </Module>
    </template>
  </FlexCol>
</template>

<script lang="ts">
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import localcache from '~/utils/cache'
import { requestCreateMoment } from '~/api'
import type { ICreateMoment } from '~/api'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import TagList from '~/components/page/createBlog/TagList.vue'
import Module from '~/components/global/Module.vue'
import { message } from 'ant-design-vue'
import AboutISaw from '~/components/page/blog/AboutISaw.vue'

export default {
  components: { Editor, Toolbar, TagList, Module, AboutISaw },
  setup() {
    const router = useRouter()
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

    // 文章内容
    const visible = ref<boolean>(false)

    const handleQuitEdit = () => {
      visible.value = true
    }

    const saveEdit = () => {
      localcache.setCache('editingBlog', {
        title: blogTitle.value,
        content: valueHtml.value,
        type: blogType.value
      })

      const isSave = localcache.getCache('editingBlog')

      if (isSave) {
        message.success('保存成功')
        setTimeout(() => {
          message.success('正在为您跳转到首页...')
          router.push('/')
        }, 1000)
      }
      visible.value = false
    }

    // 应用上次编辑的内容
    const handleUseEdit = () => {
      const { content, title, type } = localcache.getCache('editingBlog')

      setTimeout(() => {
        valueHtml.value = content
      }, 0)

      blogTitle.value = title

      blogType.value = type
    }

    const nosaveEdit = () => {
      message.success('正在为您跳转到首页...', 2)

      setTimeout(() => {
        router.push('/')
      }, 1000)
    }

    // 发表文章
    const handlePushBlog = async () => {
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

      const res = await requestCreateMoment(data)

      if (!res.flag) {
        message.error(res.msg, 2)
        return
      }

      message.success(res.msg + '请等待管理员审核...', 2)

      setTimeout(() => {
        router.push('/')
      }, 1500)
    }

    onMounted(() => {
      // const result = cache.getCache('editingBlog')
      // if (!result) {
      //   return
      // }
      // blogTitle.value = result.title
      // blogType.value = result.type
    })

    const edited = localcache.getCache('editingBlog')

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
      // 保存文章
      visible,
      handleQuitEdit,
      saveEdit,
      nosaveEdit,
      handlePushBlog,
      edited,
      isShowEdited,
      handleUseEdit
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
