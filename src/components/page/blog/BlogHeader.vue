<template>
  <div class="blog-header -enter-y text-white rounded-md pt-13 text-center">
    <div class="blog-header-title font-bold text-3xl pb-6">
      记录Apche环境下手动配置和部署SSL证书的图文教程
    </div>

    <div class="desc-wrap">
      <div
        class="logo rounded-full h-20 w-20 overflow-hidden mt-5 mx-auto relative -top-7"
      >
        <img
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F14206928472%2F1000.jpg&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651510256&t=17fc44fffa91d0502d13a2869161b960"
          alt="头像"
          class="w-full h-full"
        />
      </div>
      <div class="desc relative -top-6">
        <div class="desc-name py-2">🧛‍♀️ ISaw</div>
        <div class="desc-tag">
          🕗3-17 <span class="mx-1">👁‍🗨1.66k阅读</span> 💬2评论
        </div>
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
.blog-header {
  background-image: url('https://cn.bing.com/th?id=OHR.Aldeyjarfoss_ZH-CN0106567013_1920x1080.jpg');
}

.logo {
  border: 4px solid #f3f5f6;
}

.desc-wrap {
  background-color: rgba(255, 255, 255, 0.245);
  backdrop-filter: saturate(150%) blur(25px);
}
</style>
