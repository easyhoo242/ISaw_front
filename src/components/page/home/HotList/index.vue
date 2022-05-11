<template>
  <div class="hotlist flex flex-col">
    <Hot :data="hotList" />
    <a-pagination
      :current="currentPage"
      :pageSize="10"
      :total="total"
      show-quick-jumper
      hideOnSinglePage
      class="my-3"
      @change="onChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { requestMomentAll } from '~/api'
import type { IMomentType } from '~/api'

export default defineComponent({
  setup() {
    const currentPage = ref(1)
    const total = ref(0)
    const hotList = ref<IMomentType[]>([])

    const getData = async () => {
      const res = await requestMomentAll(currentPage.value)

      console.log('momentList', res)

      hotList.value = res.data?.list!
      total.value = res.data?.momentCount!
    }

    const onChange = (page: number) => {
      currentPage.value = page
      getData()

      window.scrollTo({
        top: 992,
        behavior: 'smooth'
      })
    }

    onMounted(() => {
      getData()
    })

    return {
      hotList,
      total,
      currentPage,
      onChange
    }
  }
})
</script>
