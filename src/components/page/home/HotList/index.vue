<template>
  <div class="hotlist flex flex-col">
    <Hot :data="dataList" />
    <a-pagination
      :current="currentPage"
      :pageSize="10"
      :total="100"
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
    const dataList = ref<IMomentType[]>([])

    const getData = async () => {
      const res = await requestMomentAll(currentPage.value)

      console.log('momentList', res)

      dataList.value = res.data?.list as IMomentType[]
    }

    const onChange = (page: number) => {
      currentPage.value = page
      getData()

      console.log(dataList.value)

      window.scrollTo({
        top: 992,
        behavior: 'smooth'
      })
    }

    onMounted(() => {
      getData()
    })

    return {
      dataList,
      currentPage,
      onChange
    }
  }
})
</script>
