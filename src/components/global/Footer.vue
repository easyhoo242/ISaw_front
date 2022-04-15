<template>
  <div
    class="py-5 bg-gray-300 flex justify-center bg-gray-700 bg-opacity-80 border-blue-400 border-t-1"
  >
    <div class="footer w-1400px pl-4 flex justify-between items-center">
      <!-- 左 -->
      <div class="footer-left flex-1">
        <!-- 左上 -->
        <div class="footer-left-link">
          <div class="menu mb-2 flex items-center">
            <a href="/privacy/" target="_blank">隐私保护</a>
            <a href="/copyright/" target="_blank">免责声明</a>
            <a href="https://www.12377.cn/" target="_blank">举报中心</a>
            <a href="/about/" target="_blank">关于本站</a>
            <a href="/sitemap.html" target="_blank">网站地图</a>
            <a href="/archive/" target="_blank">文章归档</a>
          </div>

          <div class="text-xs">
            Copyright 2022-2022
            <a href="/">ISaw.</a>
          </div>
        </div>

        <!-- 左下 -->
        <div
          class="footer-left-desc mt-4 pt-4 border-t-light-900 border-t mr-10"
        >
          <div class="mb-2">
            <span class="rt-times mr-3">页面加载时长：xxxx秒</span>
            <span class="rt-sql mr-3">数据库查询：xx 次</span>
            <span class="rt-memory mr-3">占用内存：x.xxMB</span>
          </div>
          <span>
            <a> 京ICP备1xxxxxxxx号 </a>
          </span>
        </div>
      </div>

      <!-- 右侧 -->
      <div class="footer-right flex-0 w-465px">
        <div class="footer-right-text bg-gray-600 px-3 py-2 rounded-md">
          ISaw.ISaw.ISaw.ISaw.ISaw.ISaw.ISaw.ISaw.ISaw.ISaw.ISaw.ISaw.ISaw.
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
.a1 {
  background-color: #080808ad;
  border-top: 2px solid rgba(70, 147, 233, 0.78);
  color: #f5f5f5;
}

.footer {
  color: #dee2e6;
  font-size: 13px;

  a {
    font-size: 14px !important;
    color: #dee2e6 !important;
  }

  &-left {
    &-link {
      .menu {
        a {
          margin-right: 10px;
        }
      }
    }
  }
  &-right {
    &-text {
      font-size: 13px;
      line-height: 1.8;
    }
  }
}
</style>
