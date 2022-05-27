<template>
  <div
    class="active-top flex items-center justify-center"
    :class="list.title === '留言板' ? 'h-63' : 'h-103'"
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
  message: IBgItemType
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
      message: {
        title: '留言板',
        url: 'https://cn.bing.com/th?id=OHR.SiberianSunset_ZH-CN5711093662_1920x1080.jpg&rf=LaDigue_1920x1080.jpg?https://cn.bing.com/th?id=OHR.SiestaKey_ZH-CN1759696989_1920x1080.jpg'
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
  background-position: 0 !important;
  animation: bgsize linear 40s infinite;
}

@keyframes bgsize {
  0% {
    background-position: 100% 100% !important;
    background-size: 100%;
  }
  50% {
    background-size: 110%;
  }
  100% {
    background-position: 100% 100% !important;
    background-size: 100%;
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
