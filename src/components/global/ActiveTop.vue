<template>
  <div
    class="active-top h-103 flex items-center justify-center"
    :style="`background-image: url(${list.url})`"
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

interface IBgItemType {
  title: string
  url: string
}

interface IBgListType {
  talk: IBgItemType
  about: IBgItemType
  subject: IBgItemType
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

<style scoped>
.active-top {
  background-position: 50% 0% !important;
  animation: bgsize linear 30s infinite;
}

@keyframes bgsize {
  0% {
    background-size: 100% 100%;
  }
  50% {
    background-size: 120% 120%;
  }
  100% {
    background-size: 100% 100%;
  }
}

.active-top:hover section {
  background-color: white;
  color: #000;
  transition: all 0.5s;
}

.active-top section {
  color: white;
  border: 1px solid white;
  transition: all 0.5s;
}

.active-top section span {
  user-select: none;
  font-size: 17.5px;
  letter-spacing: 0.5em;
}
</style>
