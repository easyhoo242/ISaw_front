<template>
  <Module class="module-show h-412px grid grid-cols-4 grid-rows-1 gap-3">
    <div class="module-show-left rounded-md overflow-hidden">
      <div
        class="left-tag bg-gray-900 text-white w-25 h-8 rounded-full flex items-center justify-center"
      >
        博客模板
      </div>
      <div
        class="bg-gray-900 bg-opacity-30 h-full flex items-center justify-center"
      >
        <div class="left-content mx-6 text-white">
          博客提供zblog建站、个人博客主题模板、插件制作等一站式服务，支持主题模板的订制和仿站等服务。
        </div>
      </div>
    </div>
    <div
      class="module-show-right col-span-3 grid grid-cols-3 grid-rows-2 gap-3"
    >
      <div
        v-for="item in list"
        :key="item.id"
        class="right-item rounded-md overflow-hidden bg-cover"
        :style="`background:url(${item.url})`"
      >
        <a
          class="item-desc text-white px-3 pb-5 z-10 bg-gradient-to-b from-light-100 to-gray-500"
        >
          <div class="right-item-title text-base font-bold mt-2">
            {{ item.title }}
          </div>
          <div class="right-item-trg mt-3">
            {{ item.author }}
            {{ item.time }}
          </div>
        </a>
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
          title:
            'ZBP仿月光博客主题模板简风 ，非卖品目前仅供超级会员免费下载使用',
          time: '21-12-07',
          author: '李洋博客',
          url: 'https://www.talklee.com/zb_users/upload/2020/12/202012281609126120338334.jpg'
        },
        {
          id: 2,
          title:
            'ZBP仿月光博客主题模板简风 ，非卖品目前仅供超级会员免费下载使用',
          time: '21-12-07',
          author: '李洋博客',
          url: 'https://www.talklee.com/zb_users/upload/2021/06/202106181623980863794781.jpg'
        },
        {
          id: 3,
          title:
            'ZBP仿月光博客主题模板简风 ，非卖品目前仅供超级会员免费下载使用',
          time: '21-12-07',
          author: '李洋博客',
          url: 'https://www.talklee.com/zb_users/upload/2020/12/202012281609126120338334.jpg'
        },
        {
          id: 4,
          title:
            'ZBP仿月光博客主题模板简风 ，非卖品目前仅供超级会员免费下载使用',
          time: '21-12-07',
          author: '李洋博客',
          url: 'https://www.talklee.com/zb_users/upload/2021/04/202104191618816131846144.jpg'
        },
        {
          id: 5,
          title:
            'ZBP仿月光博客主题模板简风 ，非卖品目前仅供超级会员免费下载使用',
          time: '21-12-07',
          author: '李洋博客',
          url: 'https://res.talklee.com/upload/2020/07/202007035026_9675.png'
        },
        {
          id: 6,
          title:
            'ZBP仿月光博客主题模板简风 ，非卖品目前仅供超级会员免费下载使用',
          time: '21-12-07',
          author: '李洋博客',
          url: 'https://res.talklee.com/upload/2020/06/202006128653_3853.png'
        }
      ]
    }
  }
})
</script>

<style lang="less" scoped>
.module-show-left {
  position: relative;
  background: url('https://www.talklee.com/zb_users/upload/2022/02/202202181645151930842963.png')
    no-repeat;

  .left-tag {
    position: absolute;
    top: 20px;
    left: 20px;
  }
}

.module-show-right {
  .right-item {
    position: relative;

    &:hover {
      .item-desc {
        background-size: 200%;
        transform: translateY(-20px);
        transition: all 0.3s;
      }
    }

    .item-wrap {
      position: absolute;
    }
    .item-desc {
      position: absolute;
      bottom: -20px;
      background: rgba(0, 0, 9, 0.3);
      transition: all 0.3s;
    }
  }
}
</style>
