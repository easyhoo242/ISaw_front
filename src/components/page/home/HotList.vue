<template>
  <div class="hotlist flex flex-col">
    <Moment v-for="item in hotList" :key="item.momentId" :data="item" />

    <a-pagination
      :current="currentPage"
      :pageSize="10"
      :total="total || 200"
      show-quick-jumper
      hideOnSinglePage
      class="my-3"
      @change="handlePageChange"
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

      hotList.value = res.list!
      total.value = res.momentCount!
    }

    const handlePageChange = (page: number) => {
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
      handlePageChange
    }
  }
})
</script>
