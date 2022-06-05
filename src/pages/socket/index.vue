<template>
  <div>
    <input type="text" placeholder="请输入聊天信息" v-model="message" />

    <button @click="handleSend">发送</button>

    <div>
      <ul>
        <li v-for="item in msgList" :key="item.id">
          <div>
            <span> 姓名： {{ item.user }} </span>
            <span> 时间： {{ item.dataTime }} </span>
            <span> 内容： {{ item.msg }} </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import localcache from '~/utils/cache'
import { useWebsocket } from '~/hooks'

interface IMsgType {
  id: number
  user: string
  dataTime: number
  msg: string
}

const userInfo = localcache.getCache('user')
const message = ref('')
const msgList = ref<IMsgType[]>([])

const handleMessage = (e: any) => {
  console.log(e)
}

const ws = useWebsocket()

const handleSend = () => {
  const _msg = message.value

  ws.send(
    JSON.stringify({
      userInfo,
      message: _msg
    })
  )

  console.log(
    ws.addEventListener('message', (e) => {
      console.log(e.data)
    })
  )
}
</script>

<style scoped></style>
