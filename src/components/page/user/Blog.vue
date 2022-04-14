<template>
  <Module v-for="item in data" :key="item.id" class="module flex">
    <div class="logo flex-0 w-210px h-158px rounded-md overflow-hidden mr-5">
      <!-- <A :href="`/blog/${item.id}`"> <img :src="item.img" alt="" /></A> -->
      <A href="/blog">
        <img
          :src="
            item.logo ||
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.3xm.com.cn%2Fimages%2Fb%2F204%2F3702022602375856066119.jpg&refer=http%3A%2F%2Fimg.3xm.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652477933&t=e22aae556d7468713c7c49ce3d2537fd'
          "
          alt=""
      /></A>
    </div>

    <div class="hotlist-content flex-1 pr-3">
      <div class="title flex items-center text-gray-700">
        <div v-if="item.like > 100" class="hot-tag mr-2">热文</div>
        <A href="/blog">
          <div class="text-lg">
            {{ item.title || '这个人也太懒了吧 居然忘了取标题' }}
          </div>
        </A>
      </div>

      <div class="content text-sm my-3 text-gray-500 min-h-77px">
        {{ item.content || '这是内容' }}
      </div>

      <div class="footer pt-2 flex items-center justify-between text-gray-400">
        <div class="tag flex-1 flex items-center">
          <div>🕒 {{ item.createTime.split('T')[0] }}</div>
          <div>{{ item.like }} 点赞</div>
          <div>💬 {{ item.commentCount }} 评论</div>
        </div>
        <div class="who flex-0">
          <!-- <a-icon></a-icon> -->
          <A :href="`/user/${item.users.id}`">🏆 {{ item.users.name }}</A>
        </div>
      </div>
    </div>
  </Module>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { BASE_LOGO } from '~/api'
import type { IBlogResultListType } from '~/api'

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<IBlogResultListType[]>,
      default: () => []
    }
  },
  setup() {
    return {
      BASE_LOGO
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
