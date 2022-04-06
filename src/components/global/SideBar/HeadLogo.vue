<template>
  <div class="w-full rounded-lg shadow-md z-10 overflow-hidden">
    <div class="header pt-12.5">
      <div
        class="mx-auto w-23 h-23 overflow-hidden rounded-full border-white border-5 z-30"
      >
        <img
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F14206928472%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651510256&t=17fc44fffa91d0502d13a2869161b960"
          alt=""
          class="w-full max-h-full"
        />
      </div>

      <div class="slogan bg-white pb-2.5 px-5 text-center pt-2">
        <div
          class="title text-gray-700 font-bold flex items-center justify-center"
        >
          <div><A href="/user">ISaw</A></div>
          <div class="v px-1 ml-2">v</div>
        </div>
        <div class="desc mt-5px text-gray-500">
          提供个人/企业网站建设_制作zblog博客主题模板以及SEO排名优化的原创科技博客（Talklee.Com）
        </div>
      </div>
    </div>

    <div class="tag bg-white flex items-center pb-5">
      <div class="tag-item">
        <div class="tag-item__count mb-3 text-gray-700">644</div>
        <div class="tag-item__title text-gray-500">文章数</div>
      </div>
      <div class="tag-item">
        <div class="tag-item__count mb-3 text-gray-700">34673</div>
        <div class="tag-item__title text-gray-500">评论数</div>
      </div>
      <div class="tag-item">
        <div class="tag-item__count mb-3 text-gray-700">238475</div>
        <div class="tag-item__title text-gray-500">浏览数</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.header {
  background: url(http://img.t.sinajs.cn/t5/skin/public/profile_cover/015.jpg?version=51d3ce829429dfsdfksef1feed06201411051715?/zb_users/theme/cardslee/style/images/aside-author-bg.jpg)
    no-repeat center center;
  border-radius: 0.5rem 0.5rem 0 0;
  position: relative;

  &::before {
    content: ' ';
    position: absolute;
    top: 5px;
    width: 100%;
    height: 60%;
    background: linear-gradient(to bottom, transparent, transparent, #fff);
    z-index: 10;
  }
}

.slogan {
  .title {
    .v {
      background-image: -webkit-linear-gradient(
        0deg,
        rgba(253, 165, 34, 0.9294117647058824) 0%,
        #fd4c4c 100%
      );
      font-size: 10px;
      color: #fff;
      display: inline-block;
      vertical-align: text-top;
      border-radius: 2px;
      line-height: 1.4;
      letter-spacing: 0px;
      margin-top: 1px;
    }
  }
  .desc {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

.tag {
  .tag-item {
    flex: 1;
    text-align: center;
    border-right: 1px solid #666;

    &:last-child {
      border: none;
    }
  }
}
</style>
