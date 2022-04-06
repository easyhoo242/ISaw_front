<template>
  <Module v-for="item in data" :key="item.id" class="module flex">
    <div class="logo flex-0 w-210px h-158px rounded-md overflow-hidden mr-5">
      <!-- <A :href="`/blog/${item.id}`"> <img :src="item.img" alt="" /></A> -->
      <A href="/blog"> <img :src="item.img" alt="" /></A>
    </div>

    <div class="hotlist-content flex-1 pr-3">
      <div class="title flex items-center text-gray-700">
        <div v-if="item.read > 500" class="hot-tag mr-2">热文</div>
        <A href="/blog">
          <div class="text-lg">{{ item.title }}</div>
        </A>
      </div>

      <div class="content text-sm my-3 text-gray-500">
        {{ item.content }}
      </div>

      <div class="footer pt-2 flex items-center justify-between text-gray-400">
        <div class="tag flex-1 flex items-center">
          <div>🕒 {{ item.time }}</div>
          <div>👁‍🗨 {{ item.read }} 阅读</div>
          <div>💬 {{ item.discuss }} 评论</div>
        </div>
        <div class="who flex-0">
          <!-- <a-icon></a-icon> -->
          <A href="/user">🏆 {{ item.author }}</A>
        </div>
      </div>
    </div>
  </Module>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'

interface IDataType {
  author: string
  id: number
  img: string
  title: string
  content: string
  time: string
  read: number
  discuss: number
}

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<IDataType[]>,
      default: () => []
    }
  }
})
</script>

<style lang="less" scoped>
.module {
  .logo {
    img {
      max-width: 100%;
      height: 100%;
    }
  }

  .hotlist-content {
    .content {
      line-height: 1.8 !important;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .footer {
      .tag {
        div {
          margin-right: 16px;
        }
      }
    }
  }
}

.hot-tag {
  background-color: #ff9627;
  border-radius: 2px;
  color: #fff;
  font-size: 12px;
  padding: 2px 4px;
}
</style>
