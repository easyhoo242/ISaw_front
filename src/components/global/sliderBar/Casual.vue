<template>
  <Module title="随便看看" corner class="mt-3">
    <div class="content mt-4 flex flex-wrap justify-between">
      <div
        v-for="item in list"
        :key="item.id"
        class="content-item flex-0 w-42 overflow-hidden mb-4 border-b-1px"
      >
        <div class="logo w-full h-27 rounded-xl overflow-hidden flex items-center justify-center">
          <img :src="item.url" alt="" class="m-w-full" />
        </div>
        <div class="desc py-6px">没有内容的网站怎么去没有内容的网站怎么去</div>
      </div>
    </div>
  </Module>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      list: [
        {
          id: 1,
          title: '没有内容的网站怎么去做优化没有内容的网站怎么去做优',
          url: 'https://www.talklee.com/zb_users/upload/2018/05/201805081525763112332009.jpg'
        },
        {
          id: 2,
          title: '没有内容的网站怎么去做优化没有内容的网站怎么去做优',
          url: 'https://www.talklee.com/zb_users/upload/2020/04/202004261587892427688574.png'
        },
        {
          id: 3,
          title: '没有内容的网站怎么去做优化没有内容的网站怎么去做优',
          url: 'https://www.talklee.com/zb_users/upload/2018/05/201805021525240084598680.jpg'
        },
        {
          id: 4,
          title: '没有内容的网站怎么去做优化没有内容的网站怎么去做优',
          url: 'https://www.talklee.com/zb_users/upload/2021/01/202101121610421833338472.png'
        },
        {
          id: 5,
          title: '没有内容的网站怎么去做优化没有内容的网站怎么去做优',
          url: 'https://www.talklee.com/zb_users/upload/2018/05/201805191526703205270388.jpg'
        },
        {
          id: 6,
          title: '没有内容的网站怎么去做优化没有内容的网站怎么去做优',
          url: 'https://res.talklee.com/upload/2020/07/202007035026_9675.png'
        }
      ]
    }
  }
})
</script>

<style lang="less" scoped>
.logo {
  // background-color: hotpink;
  // background: url(https://www.talklee.com/zb_users/upload/2018/05/201805081525763112332009.jpg) 100% no-repeat;
}

.content-item {
  &:nth-child(n + 5) {
    margin-bottom: 0 !important;
    border: none;
  }

  .desc {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
