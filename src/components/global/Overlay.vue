<template>
  <div class="bg-gray-200 mb-4 rounded-md overflow-hidden relative mt-3">
    <div class="bg-img h-300px" :style="`background-image: url(${Show.url});`">
      <div></div>
    </div>
    <div class="content absolute bottom-0 p-15px w-full">
      <div class="content-title">
        {{ Show.title }}
        <sup class="content-title__tag mx-1"> {{ total }} </sup>
      </div>
      <div class="content-desc mt-5px">
        {{ Show.desc }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

interface IDataType {
  title: string
  desc: string
  url: string
}

export default defineComponent({
  props: {
    data: {
      type: Number,
      default: 2
    },
    total: {
      type: Number,
      default: 10
    }
  },
  setup(props) {
    const list: IDataType[] = [
      {
        title: '互联网',
        desc: '教程笔记模块主要分享电脑软件、操作系统及网站建设过程中的各种问题和解决方案，致力于创造一个高质量的交流分享平台',
        url: 'https://cn.bing.com/th?id=OHR.SiberianSunset_ZH-CN5711093662_1920x1080.jpg&rf=LaDigue_1920x1080.jpg?https://cn.bing.com/th?id=OHR.SiestaKey_ZH-CN1759696989_1920x1080.jpg'
      },
      {
        title: '教程笔记',
        desc: '教程笔记模块主要分享电脑软件、操作系统及网站建设过程中的各种问题和解决方案，致力于创造一个高质量的交流分享平台',
        url: 'https://cn.bing.com/th?id=OHR.SiberianSunset_ZH-CN5711093662_1920x1080.jpg&rf=LaDigue_1920x1080.jpg?https://cn.bing.com/th?id=OHR.SiestaKey_ZH-CN1759696989_1920x1080.jpg'
      },
      {
        title: '闲言碎语',
        desc: '教程笔记模块主要分享电脑软件、操作系统及网站建设过程中的各种问题和解决方案，致力于创造一个高质量的交流分享平台',
        url: 'https://cn.bing.com/th?id=OHR.SiberianSunset_ZH-CN5711093662_1920x1080.jpg&rf=LaDigue_1920x1080.jpg?https://cn.bing.com/th?id=OHR.SiestaKey_ZH-CN1759696989_1920x1080.jpg'
      }
    ]

    const Show = computed(() => list[props.data - 1])

    return {
      Show
    }
  }
})
</script>

<style lang="less" scoped>
.bg-img {
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: 50% 50%;
  transition: 0.3s ease-in-out;

  &:hover {
    background-size: 110%;
    transition: 0.3s ease-in-out;
  }

  div {
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0.8;
    top: 0;
    left: 0;
    -webkit-transition: opacity 0.3s ease-in-out;
    transition: opacity 0.3s ease-in-out;
    background: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(rgb(35 41 50/0%)),
      to(rgb(35 41 50/60%))
    );
    background: linear-gradient(to bottom, rgb(35 41 50/0%), rgb(35 41 50/60%));
  }
}

.content {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: saturate(150%) blur(25px);

  .content-title {
    font-size: 21px;

    .content-title__tag {
      line-height: 0;
      font-size: 75%;
    }
  }
}
</style>
