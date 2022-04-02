<template>
  <Module class="module mt-3">
    <div class="title text-lg mx-2.5 pb-2.5 font-bold border-b-1">精选导读</div>
    <div class="content mt-2 items-center flex flex-wrap">
      <div
        v-for="item in 6"
        :key="item"
        class="item h-1/2 w-1/3 border-b-1 border-r-1 p-15px text-center"
      >
        <div class="item-title flex items-center justify-between pb-2">
          <div class="title-left">教程笔记</div>
          <div class="title-right">2017-10-26</div>
        </div>

        <div class="item-content text-left">
          <div class="content-desc">
            <a>Z-blogPHP常见问题答疑（最新整理202lorem Lorem ipsum dolor sit, amet consectetur</a>
          </div>

          <div class="content-text mt-1.5">
            最新整理了一下zblog程序的思路，把过去遇到的问题总结一下，都是一.最新整理了一下zblog程序的思路，把过去遇到的问题总结一下，都是一.
          </div>
        </div>
      </div>
    </div>
  </Module>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from 'ant-design-vue'

export default defineComponent({
  components: {
    Icon
  }
})
</script>

<style lang="less" scoped>
.module {
  position: relative;

  &:before {
    content: ' ';
    position: absolute;
    top: 0;
    left: 26px;
    height: 3px;
    width: 30px;
    background-color: #42a1ff;
  }

  .item {
    &:nth-child(-n + 3) {
      padding-top: 0 !important;
    }

    &:nth-child(3n) {
      border-right: none;
    }

    &:nth-child(n + 4) {
      border-bottom: none;
    }

    .item-title {
      font-size: 12px;

      .title-left {
        height: 22px;
        width: 70px;
        line-height: 22px;
        background-color: #0089ff;
        border-radius: 20px;
        color: #fff;
      }
    }

    .item-content {
      .content-desc {
        font-size: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 500;
      }

      .content-text {
        font-size: 12px;
        color: #777;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
