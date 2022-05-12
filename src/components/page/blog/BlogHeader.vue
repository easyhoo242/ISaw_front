<template>
  <div
    class="blog-header -enter-y text-white rounded-md pt-13 text-center overflow-hidden"
  >
    <div class="blog-header-title font-bold text-3xl pb-6">
      {{ data.title }}
    </div>

    <div class="desc-wrap">
      <div
        class="logo rounded-full h-20 w-20 overflow-hidden mt-5 mx-auto relative -top-7"
      >
        <img :src="data.avatarUrl" alt=" " class="w-full h-full" />
      </div>
      <div class="desc relative -top-6">
        <div class="desc-name py-2 text-xl flex items-center justify-center">
          <A :href="`/user/${data.id}`">
            {{ data.nickname }}
          </A>
        </div>
        <div class="desc-tag">
          {{ data?.createTime?.split('T')[0] }}
          <span class="mx-1 btn" @click="handleAgree(data.momentId)">
            👍 {{ data.agree }} 点赞
          </span>
          <span class="mx-1"> 💬 {{ data.count }} 评论 </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { requestMomentAgree } from '~/api'
import { headerInfo } from '~/pages/blog/[id].vue'

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<headerInfo>,
      default: () => {}
    }
  },
  setup(props) {
    console.log(1, props.data)

    const handleAgree = async (momentId: number) => {
      try {
        const res = await requestMomentAgree(momentId)

        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }

    return {
      handleAgree
    }
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

.btn {
  cursor: pointer;
  padding: 2px 4px;
  background-color: #fb8c6e;
  border-radius: 4px;
}
</style>
