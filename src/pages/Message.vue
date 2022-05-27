<template>
  <div class="mx-auto w-250">
    <Module>
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        mode="default"
      />

      <Editor
        style="height: 200px; overflow-y: hidden"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        mode="default"
        @onCreated="handleCreated"
      />

      <hr />

      <div class="flex items-center justify-between">
        <span>
          <a-rate v-model:value="score" size="small" :tooltips="scoredesc" />
          <span class="ant-rate-text">{{ scoredesc[score - 1] }}</span>
        </span>
        <a-button class="mt-3" type="default" @click="handleAdd">留言</a-button>
      </div>
    </Module>

    <Module v-for="item in messageList" :key="item.id">
      <a-comment>
        <template #author>
          <A :href="`/user/${item.user.id}`"> {{ item.user.nickname }} </A>
        </template>

        <template #avatar>
          <a-avatar :src="item.user.avatarUrl" alt="Han Solo" />
        </template>

        <template #content>
          <a-typography v-html="item.content"></a-typography>
        </template>

        <template #datetime>
          <a-tooltip :title="moment().format('YYYY-MM-DD HH:mm:ss')">
            <span>{{ moment().from(item.createTime) }}</span>
          </a-tooltip>

          <a-tooltip title="评分">
            <b class="ml-3"> 对网站的评价：{{ scoredesc[item.score - 1] }} </b>
          </a-tooltip>
        </template>
      </a-comment>
    </Module>

    <a-pagination
      :current="currentPage"
      :pageSize="10"
      :total="total || 200"
      show-quick-jumper
      hideOnSinglePage
      class="my-3"
      @change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, onMounted, onBeforeUnmount } from 'vue'
import moment from 'moment'
import { requestMessageList, requestAddMesage } from '~/api'
import type { IMessageList } from '~/api'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { message } from 'ant-design-vue'

const messageList = ref<IMessageList[]>([])

const total = ref(100)
const currentPage = ref(1)

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')

// 模拟 ajax 异步获取内容

const toolbarConfig = {
  excludeKeys: [
    'fullScreen',
    'code',
    'codeBlock',
    'bulletedList',
    'numberedList',
    'blockquote',
    'bold',
    'italic',
    'move',
    'head',
    'bold',
    'fontSize',
    'fontName',
    'italic',
    'underline',
    'strikeThrough',
    'indent',
    'lineHeight',
    'foreColor',
    'backColor',
    'link',
    'list',
    // 'todo',
    'justify',
    'quote',
    // 'emoticon',
    // 'image',
    // 'video',
    // 'table',
    'code',
    'splitLine',
    'undo',
    'redo'
  ],
  menu: []
}
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

const handleAdd = async () => {
  const res = await requestAddMesage(valueHtml.value, score.value)
  if (!res.flag) {
    message.error(res.msg, 3)
    return
  }

  message.success(res.msg, 3)

  getData()
}

// 评分
const score = ref<number>(3)

const scoredesc = ref<string[]>([
  '建议remake',
  '弟中之弟',
  '一般',
  '不错',
  '好好好！'
])

const getData = async () => {
  const res = await requestMessageList(currentPage.value)

  messageList.value = res.data?.list!
  total.value = res.data?.count!
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  getData()
}

onMounted(() => {
  getData()
})
</script>

<route lang="yaml">
meta:
  layout: fullpage
</route>
