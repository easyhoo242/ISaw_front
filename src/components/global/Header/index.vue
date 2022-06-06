<template>
  <header class="flex bg-white shadow-md">
    <div
      class="flex items-center justify-center w-full h-56px border-gray-100 dark:bg-gray-900 dark:border-b-0 border-b-1"
    >
      <div class="w-1400px flex items-center justify-between relative">
        <!-- 左边 -->
        <div class="flex items-center">
          <div class="flex-0 flex mr-10">
            <span
              class="text-blue-900 dark:text-white font-bold text-xl"
              style="user-select: none"
            >
              ISaw
            </span>
          </div>
          <a-tabs v-model:activeKey="activeKey" class="flex-1 h-56px">
            <a-tab-pane key="/">
              <template #tab>
                <div class="py-2">
                  <strong class="align-top">首页</strong>
                </div>
              </template>
            </a-tab-pane>
            <a-tab-pane key="/note">
              <template #tab>
                <span class="py-2">
                  <strong class="align-top">教程笔记</strong>
                </span>
              </template>
            </a-tab-pane>
            <a-tab-pane key="/talk">
              <template #tab>
                <span class="py-2">
                  <strong class="align-top">闲言碎语</strong>
                </span>
              </template>
            </a-tab-pane>
            <a-tab-pane key="/message">
              <template #tab>
                <span class="py-2">
                  <strong class="align-top">留言板</strong>
                </span>
              </template>
            </a-tab-pane>
            <a-tab-pane key="/about">
              <template #tab>
                <span class="py-2">
                  <strong class="align-top">关于作者</strong>
                </span>
              </template>
            </a-tab-pane>
          </a-tabs>
        </div>

        <!-- 右边 -->
        <div class="flex-0 flex items-center">
          <a-switch
            v-model:checked="darkSwitch"
            class="bg-purple-500 my-switch"
          >
            <template #checkedChildren>
              <noto-v1:sun-with-face class="mt-0.5" />
            </template>
            <template #unCheckedChildren>
              <noto-v1:last-quarter-moon-face class="mt-0.5" />
            </template>
          </a-switch>

          <LoginRegist />
        </div>

        <div class="absolute -right-10 t-2">
          <A href="/createBlog">
            <div
              class="h-8 w-8 rounded-full bortder-gray-700 border-2px text-center"
              style="line-height: 30px"
            >
              文
            </div>
          </A>
        </div>

        <a-button
          v-if="userInfo.token !== 'unLogin'"
          class="absolute -right-20 t-0"
          type="primary"
          shape="circle"
          @click="showDrawer"
        >
          聊
        </a-button>
      </div>
    </div>

    <a-drawer
      :width="500"
      title="ISaw 聊天室"
      placement="left"
      :visible="visible"
      @close="onClose"
    >
      <div class="text-base text-center mb-3">
        当前在线人数 : {{ currentOnlineNum }}
      </div>

      <div
        v-show="isShowSocket"
        id="socketRef"
        class="w-80% p-3 overflow-auto bg-gray-200 rounded-md dark:bg-dark-600 h-1000px"
      >
        <div v-for="item in msgList" class="mb-2">
          <div v-if="userInfo.id !== item.user.id" class="flex -enter-x">
            <div class="logo flex-0 mr-3 pt-2">
              <a-avatar :src="item.user?.avatarUrl" />
            </div>
            <div class="body flex-1">
              <div class="title">
                {{ item.user.nickname }}
                |
                <span class="text-xs">
                  {{ dayjs(item.createTime).fromNow() }}
                </span>
              </div>
              <div>
                <span class="content">
                  {{ item.content }}
                </span>
              </div>
            </div>
          </div>

          <div v-else class="flex -enter-x">
            <div class="body flex-1">
              <div class="title text-right">
                <span class="text-xs">
                  {{ dayjs().from(dayjs(item.createTime)) }}
                </span>
                |
                {{ item.user?.nickname }}
              </div>
              <div class="flex justify-end">
                <span class="content active">
                  {{ item.content }}
                </span>
              </div>
            </div>

            <div class="logo flex-0 ml-3 pt-2">
              <a-avatar :src="item.user?.avatarUrl" />
            </div>
          </div>
        </div>
      </div>

      <div v-if="isShowSocket" class="mt-4 flex">
        <a-input
          id="textareaRef"
          v-model:value="cutrrentMessage"
          placeholder="请输入聊天信息"
          @keyup.enter.native="handleSend"
        />

        <Emoji
          ref="getEmojiRef"
          style="transform: translateY(-4px)"
          @change="handleGetEmoji"
        />

        <a-button type="default" class="ml-3" @click="handleSend">
          发送
        </a-button>
      </div>

      <a-button v-if="!isShowSocket" type="primary" @click="handleJoin">
        加入聊天
      </a-button>
    </a-drawer>
  </header>
</template>

<script setup lang="ts">
import { watch, ref, onMounted, onUpdated, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' // 到指定时间需要的插件
import 'dayjs/locale/zh' // 集成中文
import { useToggleDark, useWebsocket } from '~/hooks'
import localcache from '~/utils/cache'
import filterWords from '~/utils/filterWords'
import { notification } from 'ant-design-vue'

dayjs.extend(relativeTime)
dayjs.locale('zh')

interface IMsgType {
  content: string
  createTime: string

  user: { id: number; nickname: string; avatarUrl: string }
}

const { isDark, toggleDark } = useToggleDark()
const router = useRouter()
const store = useStore()

//tab相关逻辑
const activeKey = ref('/')
watch(activeKey, (activeKey) => {
  router.push(activeKey)
})

//暗黑模式开关逻辑
const darkSwitch = ref(isDark.value)
watch(darkSwitch, () => {
  toggleDark()
})

const visible = ref<boolean>(false)

const showDrawer = () => {
  visible.value = true
}

const onClose = () => {
  visible.value = false
}

// 聊天  发送
const userInfo = localcache.getCache('user')
const cutrrentMessage = ref('')
const msgList = ref<IMsgType[]>([])
const currentOnlineNum = ref(0)

const ws = useWebsocket()

ws.addEventListener(
  'message',
  (e) => {
    const res = JSON.parse(e.data)

    if (Array.isArray(res?.data)) {
      localcache.setCache('socket', res?.data)

      msgList.value = localcache.getCache('socket')

      const socketRef = document.getElementById(
        'socketRef'
      ) as HTMLTextAreaElement

      nextTick(() => {
        socketRef.scrollTop = socketRef.scrollHeight
      })
    }

    if (typeof res?.onLineCount === 'number') {
      currentOnlineNum.value = res?.onLineCount
    }

    if (typeof res.data === 'object' && !Array.isArray(res?.data)) {
      msgList.value.push(res.data)

      currentOnlineNum.value = res.onLineCount

      const socketRef = document.getElementById(
        'socketRef'
      ) as HTMLTextAreaElement

      nextTick(() => {
        socketRef.scrollTop = socketRef.scrollHeight
      })

      localcache.setCache('socket', msgList.value)
    }

    if (typeof res?.data === 'string') {
      notification.open({
        message: `${res.data}啦~`
      })

      return
    }

    // console.log(msgList.value)
  },
  false
)

// 表情
const handleGetEmoji = (emoji: string) => {
  const textarea = document.getElementById('textareaRef') as HTMLTextAreaElement

  function insertTxtAndSetcursor(insertTxt: string) {
    // 获取到指定标签
    let startPos = textarea.selectionEnd
    let endPos = textarea.selectionEnd
    if (startPos === undefined || endPos === undefined) return

    let oldTxt = textarea.value
    let result =
      oldTxt.substring(0, startPos) + insertTxt + oldTxt.substring(endPos)
    textarea.value = result
    textarea.focus()
    textarea.selectionStart = startPos + insertTxt.length
    textarea.selectionEnd = startPos + insertTxt.length

    return result
  }

  cutrrentMessage.value = insertTxtAndSetcursor(emoji)!
}

const handleSend = () => {
  const _msg = cutrrentMessage.value.trim()

  if (!_msg) {
    return
  }

  if (filterWords(_msg)) {
    notification.open({
      message: '有违规词！',
      description: '聊天内容禁止出现违规词，请谨慎发言'
    })

    return
  }

  ws.send(
    JSON.stringify({
      userInfo,
      message: _msg
    })
  )

  cutrrentMessage.value = ''
}

const isShowSocket = ref(false)

const handleJoin = () => {
  handleSend()

  isShowSocket.value = true
}

onMounted(() => {
  activeKey.value = router.currentRoute.value.path
  store.dispatch('actionGetUserInfo')

  msgList.value = localcache.getCache('socket')
})

onUpdated(() => {})
</script>

<style lang="less" scoped>
.title {
  font-size: 14px;
  margin-bottom: 5px;
}
.content {
  position: relative;
  font-size: 16px;
  background-color: #fff;
  border-radius: 5px;
  max-width: 220px;
  padding: 2px 10px 2px 8px;
  display: inline-block;
  z-index: 99;

  &:hover {
    background-color: rgb(252, 246, 246);
  }

  &::before {
    content: ' ';
    position: absolute;
    left: -3px;
    top: 8px;
    height: 10px;
    width: 10px;
    padding: 2px;
    background-color: #fff;
    transform: rotate(45deg);

    z-index: -1;
  }

  &.active {
    background-color: #95ec69;
    padding: 2px 8px 2px 10px;

    &:hover {
      background-color: #89e45b;
    }

    &:hover::after {
      background-color: #89e45b;
    }

    &::before {
      display: none;
    }

    &::after {
      content: ' ';
      position: absolute;
      right: -3px;
      top: 8px;
      height: 10px;
      width: 10px;
      padding: 2px;
      background-color: #95ec69;
      transform: rotate(40deg);
    }
  }
}
</style>
