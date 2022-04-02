<template>
  <div class="w-full">
    <div class="w-full bg-white dark:bg-gray-900 rounded-lg shadow-md pt-12.5 bg-gray-100">
      <div class="mx-auto w-23 h-23 overflow-hidden rounded-full border-light-900 border-5">
        <img
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F14206928472%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651510256&t=17fc44fffa91d0502d13a2869161b960"
          alt=""
          class="w-full max-h-full"
        />
      </div>
      <div class="slogan mt-5px mb-2.5 px-5 text-center">
        <div class="title text-gray-700 font-bold flex items-center justify-center">
          <div>ISaw</div>
          <div class="v px-1 ml-2">v</div>
        </div>
        <div class="desc mt-5px text-gray-500">
          提供个人/企业网站建设_制作zblog博客主题模板以及SEO排名优化的原创科技博客（Talklee.Com）
        </div>
      </div>

      <div class="tag flex items-center pb-5">
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

    <Casual />
  </div>
</template>

<style lang="less" scoped>
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
