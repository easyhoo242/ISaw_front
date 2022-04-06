<template>
  <Module title="热门文章" corner class="pb-1">
    <div class="hot mt-3">
      <div
        v-for="item in list"
        :key="item.id"
        class="hot-item mb-2.5 h-162px rounded-xl bg-cover"
        :style="`background: url(${item.url});`"
      >
        <a class="item-bg__wrap rounded-xl"> <span></span></a>
        <div class="item-content text-white w-full p-2">
          <div class="item-content__desc pt-2">{{ item.title }}</div>
          <div class="item-content__tag text-xs mt-1">
            {{ item.read }} 阅读 ， {{ item.time }}
          </div>
        </div>
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
          title: '微信小程序调用相机或者图库实现扫描二维码或者条码的文档教程',
          id: 1,
          read: 158,
          time: '02-08',
          url: 'https://www.talklee.com/zb_users/upload/2022/02/202202181645151930842963.png'
        },
        {
          title: 'CSS轻松实现博客网站Logo扫光效果(亲测有效)',
          id: 2,
          read: 1438,
          time: '03-10',
          url: 'https://www.talklee.com/zb_users/upload/2022/03/202203021646208396364255.png'
        },
        {
          title:
            'zblog怎么搭建专题页？如何实现调用多个tag及tag所属文章的图文教程',
          id: 3,
          read: 1366,
          time: '05-36',
          url: 'https://www.talklee.com/zb_users/upload/2022/02/202202231645607806451387.png'
        }
      ]
    }
  }
})
</script>

<style lang="less" scoped>
.hot-item {
  position: relative;

  .item-bg__wrap {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #000;
    opacity: 0.2;
  }
  .item-content {
    position: absolute;
    bottom: 0;
  }
}
</style>
