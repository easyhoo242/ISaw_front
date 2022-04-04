<template>
  <div
    class="active-top h-103 bg-gray-400 flex items-center justify-center"
    :style="`background: url(${list.url})`"
  >
    <section
      class="m-auto w-100 h-12 flex items-center justify-center rounded-full"
    >
      <span class="font-bold"> {{ list.title }} </span>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'

interface IBgListType {
  talk: {
    title: string
    url: string
  }
  about: {
    title: string
    url: string
  }
  subject: {
    title: string
    url: string
  }
}

export default defineComponent({
  setup() {
    const route = useRoute()
    const currentPath = computed(() => route.path.split('/')[1])

    const bgList: IBgListType = {
      talk: {
        title: '闲言碎语',
        url: 'https://cn.bing.com/th?id=OHR.LoughriggTarn_ZH-CN1404327665_1920x1080.jpg'
      },
      about: {
        title: '随便看看',
        url: 'https://cn.bing.com/th?id=OHR.LoughriggTarn_ZH-CN1404327665_1920x1080.jpg'
      },
      subject: {
        title: '专题目录',
        url: 'https://www.bing.com/th?id=OHR.CrystalCave_ZH-CN1284839856_1920x1080.jpg'
      }
    }

    const list = computed(() => bgList[currentPath.value as keyof IBgListType])

    return {
      list
    }
  }
})
</script>

<style lang="less" scoped>
.active-top {
  background-position-y: center center !important;
  background-size: 100% auto !important;

  &:hover {
    section {
      background-color: white;
      color: #000;
      transition: all 0.5s;
    }
  }

  section {
    color: white;
    border: 1px solid white;
    transition: all 0.5s;

    span {
      user-select: none;
      font-size: 17.5px;
      letter-spacing: 0.5em;
    }
  }
}
</style>
