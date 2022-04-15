<template>
  <Module class="module-show h-412px grid grid-cols-4 grid-rows-1 gap-3">
    <div class="module-show-left rounded-md overflow-hidden">
      <div
        class="left-tag bg-gray-900 text-white w-25 h-8 rounded-full flex items-center justify-center"
      >
        作品展示
      </div>
      <div
        class="bg-gray-900 bg-opacity-30 h-full flex items-center justify-center"
      >
        <div class="left-content mx-6 text-white">将有意思的案例放在这里以供学习和分享</div>
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
          title: '[HTML+CSS]【撸完即巅峰】倔强青铜和最强王者之间就差这个Demo',
          time: '21-12-07',
          author: 'ISaw',
          url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.doubanio.com%2Fview%2Fnote%2Fl%2Fpublic%2Fp82460877.jpg&refer=http%3A%2F%2Fimg1.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652653184&t=a59635edb652c7ee143bb09a52221652'
        },
        {
          id: 2,
          title: '[HTML+CSS]【撸完即巅峰】倔强青铜和最强王者之间就差这个Demo',
          time: '21-12-07',
          author: 'ISaw',
          url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-12-26%2F5c23275600250.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652653451&t=e6fcc82226e805c667bd9defc17a2b91'
        },
        {
          id: 3,
          title: '[HTML+CSS]【撸完即巅峰】倔强青铜和最强王者之间就差这个Demo',
          time: '21-12-07',
          author: 'ISaw',
          url: 'https://img1.baidu.com/it/u=4097408996,1673831050&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
        },
        {
          id: 4,
          title: '[HTML+CSS]【撸完即巅峰】倔强青铜和最强王者之间就差这个Demo',
          time: '21-12-07',
          author: 'ISaw',
          url: 'https://img0.baidu.com/it/u=1577615142,907299332&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500'
        },
        {
          id: 5,
          title: '[HTML+CSS]【撸完即巅峰】倔强青铜和最强王者之间就差这个Demo',
          time: '21-12-07',
          author: 'ISaw',
          url: 'https://img0.baidu.com/it/u=1577615142,907299332&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500'
        },
        {
          id: 6,
          title: '[HTML+CSS]【撸完即巅峰】倔强青铜和最强王者之间就差这个Demo',
          time: '21-12-07',
          author: 'ISaw',
          url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-12-26%2F5c23275600250.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652653451&t=e6fcc82226e805c667bd9defc17a2b91'
        }
      ]
    }
  }
})
</script>

<style lang="less" scoped>
.module-show-left {
  position: relative;
  background: url('https://img1.baidu.com/it/u=4097408996,1673831050&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500')
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
