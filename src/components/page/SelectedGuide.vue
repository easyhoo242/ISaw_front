<template>
  <Module class="module mt-3">
    <div class="content mt-4 items-center flex flex-wrap">
      <div
        v-for="item in listArr"
        :key="item.id"
        class="item h-1/2 w-1/3 border-b-1 border-r-1 p-15px text-center dark:border-gray-300"
      >
        <div class="item-title flex items-center justify-between pb-2 dark:color">
          <div class="title-tag">{{ item.type }}</div>
          <div class="title-time">{{ item.time }}</div>
        </div>

        <div class="item-content text-left">
          <div class="content-desc">
            <a>{{ item.title }}</a>
          </div>

          <div class="content-text mt-1.5">
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>
  </Module>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from 'ant-design-vue'

// interface IListType {
//   id: number
//   title: string
//   time: string
//   type: string
//   content: string
// }

export default defineComponent({
  components: {
    Icon
  },
  setup() {
    const list = [
      '1\n教程笔记\n2017-10-26\nZ-blogPHP常见问题答疑（最新整理2021/08）\n最新整理了一下zblog程序的思路，把过去遇到的zblogphp问题总结一下，都是一...',
      '2\n教程笔记\n2019-01-25\nzblog开启主题或插件显示“授权文件非法”的解决办法（支持ZBP1.7+）\n最近好些用户都在反应，说启用主题之后后台显示“授权文件非法”，导致主题无法使用，如图...',
      '3\n互联网\n2019-09-25\n网站打开之后，主题/插件显示错误的解决办法，适用于各种BUG。\n标题党怪我咯？？？这篇文章的主要目的不是真的能解决所有问题，是为了让问题具体化，按照...',
      '4\n教程笔记\n2019-07-12\nzblog备份的网站及数据库怎么恢复？\n很多人可能会安装zblog程序，但是未必会恢复数据，很多种情况我们都会需要把网站打包...',
      '5\n教程笔记\n2020-04-08\nzblog怎么在移动端显示/隐藏侧栏模块\n关于zblog主题模板手机移动端针对不同主题采用了不同的方案，有些是默认显示，有些不...',
      '6\n教程笔记\n2020-04-05\nzblog忘记后台账号密码怎么办？\n总有些人账号密码太多，多到自己也记不住，然后来回反复的尝试，还是想不起来，总觉得这个...'
    ]

    const listArr = list.map((item) => {
      const [id, type, time, title, content] = item.split('\n')

      return {
        id,
        title,
        time,
        type,
        content
      }
    })

    console.log(listArr)

    return {
      listArr
    }
  }
})
</script>

<style lang="less" scoped>
.module {
  position: relative;

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

    // type的背景颜色
    &:nth-child(2) {
      .item-title .title-tag {
        background-color: #ffaf1e;
      }
    }
    &:nth-child(3) {
      .item-title .title-tag {
        background-color: #c177ef;
      }
    }
    &:nth-child(4) {
      .item-title .title-tag {
        background-color: #f7699e;
      }
    }
    &:nth-child(5) {
      .item-title .title-tag {
        background-color: #19b6bd;
      }
    }
    &:nth-child(6) {
      .item-title .title-tag {
        background-color: #02803a;
      }
    }

    .item-title {
      font-size: 12px;

      .title-tag {
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
