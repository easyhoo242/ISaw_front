<template>
  <div
    class="active-top h-103 bg-gray-400 flex items-center justify-center"
    :style="`background: url(${bgList.talk.url})`"
  >
    <section
      class="m-auto w-100 h-12 flex items-center justify-center rounded-full"
    >
      <span class="font-bold">
        {{ bgList.talk.title }}
      </span>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      bgList: {
        talk: {
          title: '闲言碎语',
          url: 'https://cn.bing.com/th?id=OHR.LoughriggTarn_ZH-CN1404327665_1920x1080.jpg'
        },
        seesee: {
          title: '随便看看',
          url: 'https://cn.bing.com/th?id=OHR.LoughriggTarn_ZH-CN1404327665_1920x1080.jpg'
        }
      }
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
