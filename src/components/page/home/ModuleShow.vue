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
        <div class="left-content mx-6 text-white">
          将有意思的案例放在这里以供学习和分享
        </div>
      </div>
    </div>

    <!-- :style="`background:url(${item?.images[0] ? item?.images : BASE_LOGO})`" -->

    <div
      class="module-show-right col-span-3 grid grid-cols-3 grid-rows-2 gap-3"
    >
      <div
        v-for="item in list"
        :key="item.momentId"
        :style="`background: url(${item.images ? item.images[0] : BASE_LOGO});`"
        class="right-item rounded-md overflow-hidden bg-cover"
      >
        <A
          :href="`/blog/${item.momentId}`"
          class="item-desc w-full text-white px-3 pb-5 z-10 bg-gradient-to-b from-light-100 to-gray-500"
        >
          <div class="right-item-title text-base font-bold mt-2 min-h-12">
            {{ item.title }}
          </div>
          <div class="right-item-trg mt-3">
            {{ item.author.nickname }}
            {{ item?.createTime?.split('T')[0] }}
          </div>
        </A>
      </div>
    </div>
  </Module>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { requestMomentShow, BASE_LOGO } from '~/api'
import type { IMomentType } from '~/api'

export default defineComponent({
  setup() {
    const list = ref<IMomentType[]>([])

    const getData = async () => {
      const res = await requestMomentShow(1, 6, 4)

      list.value = res?.list as IMomentType[]
    }

    onMounted(() => {
      getData()
    })
    return {
      list,
      BASE_LOGO
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
