<template>
  <Module class="module h-320px mt-3">
    <div class="title text-lg mx-2.5 pb-2.5 font-bold border-b-1">精选导读</div>
    <div class="content mt-2 mx-2.5 items-center flex flex-wrap">
      <div v-for="item in 6" :key="item" class="item h-1/2 w-1/3 border-b-1 border-r-1 text-center">
        <div class="item-title flex items-center justify-between pb-1">
          <div class="title-left">教程笔记</div>
          <div class="title-right">2017-10-26</div>
        </div>

        <div class="item-content">
          <div class="content-decs">
            Z-blogPHP常见问题答疑（最新整理202lorem Lorem ipsum dolor sit, amet consectetur
          </div>

          <div class="content-text">
            最新整理了一下zblog程序的思路，把过去遇到的zblogphp问题总结一下，都是一.
          </div>
        </div>
      </div>
    </div>
  </Module>
</template>

<script lang="ts" setup></script>

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
    padding: 0 5px;

    &:nth-child(3n) {
      border-right: none;
    }

    &:nth-child(n + 4) {
      border-bottom: none;
      padding-top: 8px;
    }
    .item-title {
      font-size: 12px;

      .title-left {
        padding: 1px 5px;
        background-color: #0089ff;
        border-radius: 20px;
        color: #fff;
      }
    }

    .item-content {
      .content-desc {
        font-size: 15px;
      }

      .content-text {
        font-size: 12px;
      }
    }
  }
}
</style>
