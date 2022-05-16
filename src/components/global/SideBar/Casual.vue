<template>
  <Module title="随便看看" corner class="relative">
    <a-button
      size="small"
      shape="round"
      :loading="isShowLoading"
      class="absolute top-18px right-6"
      @click="handleAnother"
    >
      换一批
    </a-button>

    <div v-if="list.length" class="content mt-4 grid grid-cols-2 gap-3 px-2">
      <div
        v-for="item in list"
        :key="item.momentId"
        class="content-item flex-0 overflow-hidden border-b-1px"
      >
        <A :href="`/blog/${item.momentId}`">
          <div class="logo w-full h-27 rounded-xl overflow-hidden">
            <img
              v-if="item.images"
              :src="item.images[0]"
              alt=""
              class="w-full h-full max-h-full"
            />

            <img
              v-else
              :src="BASE_LOGO"
              alt=""
              class="w-full h-full max-h-full"
            />
          </div>
          <div class="desc py-6px">{{ item.title || item.content }}</div>
        </A>
      </div>
    </div>

    <div v-else>
      <a-empty :description="null" class="py-1" />
    </div>
  </Module>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { requestCauseList } from '~/api'
import type { IMomentType } from '~/api'
import { BASE_LOGO } from '~/api'
import { message } from 'ant-design-vue'

export default defineComponent({
  setup() {
    const list = ref<IMomentType[]>([])
    const currentPage = ref(1)
    const isShowLoading = ref(false)

    const getData = async () => {
      try {
        const res = await requestCauseList(currentPage.value)

        list.value = res.data!

        return res
      } catch (error) {
        message.error('随便看看列表请求出错， 请刷新页面')
      }
    }

    const handleAnother = () => {
      if (!list.value.length) {
        // 这设置为0  下面还会+1  如果为1 则第一页在下次循环中会消失
        currentPage.value = 0
      }

      isShowLoading.value = true
      ++currentPage.value

      setTimeout(() => {
        getData()

        isShowLoading.value = false
      }, 500)
    }

    onMounted(() => {
      getData()
    })

    return {
      list,
      BASE_LOGO: BASE_LOGO,
      handleAnother,
      isShowLoading
    }
  }
})
</script>

<style lang="less" scoped>
.logo {
  img {
    &:hover {
      height: 200%;
      height: 200%;
    }
  }
}

.content-item {
  &:nth-child(n + 5) {
    margin-bottom: 0 !important;
    border: none;
  }

  .desc {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
