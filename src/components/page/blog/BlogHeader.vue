<template>
  <div
    class="blog-header -enter-y text-white rounded-md pt-13 text-center overflow-hidden"
  >
    <div class="blog-header-title font-bold text-3xl pb-6">
      {{ data?.title }}
    </div>

    <div class="desc-wrap">
      <div
        class="logo rounded-full h-20 w-20 overflow-hidden mt-5 mx-auto relative -top-7"
      >
        <img :src="data?.author?.logo" alt="头像" class="w-full h-full" />
      </div>
      <div class="desc relative -top-6">
        <div class="desc-name py-2 text-xl flex items-center justify-center">
          <A :href="`/user/${data?.author?.userId}`">
            <span class="text-base"> 🧛‍♀️ </span>
            {{ data?.author?.name }}
          </A>
        </div>
        <div class="desc-tag">
          {{ data?.createTime?.split('T')[0] }}
          <span class="mx-1">👁‍🗨1.66k 阅读</span> 💬{{ data.count }} 评论
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<{
        content: string
        title: string
        createTime: string
        author: {
          logo: string
          name: string
          userId: number
        }
        count: number
      }>,
      default: () => ({})
    }
  },
  setup(props) {
    console.log(1, props.data)
    return {}
  }
})
</script>

<style lang="less" scoped>
.blog-header {
  background-image: url('https://cn.bing.com/th?id=OHR.Aldeyjarfoss_ZH-CN0106567013_1920x1080.jpg');
}

.logo {
  border: 4px solid #f3f5f6;
}

.desc-wrap {
  background-color: rgba(255, 255, 255, 0.245);
  backdrop-filter: saturate(150%) blur(25px);
}
</style>
