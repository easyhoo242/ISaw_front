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
import { defineComponent, ref } from 'vue'
import { requestMomentAll, IBlogResultListType } from '~/api'

export default defineComponent({
  setup() {
    const currentPage = ref(1)
    const dataList = ref<IBlogResultListType[]>([])

    const getData = async () => {
      const res = await requestMomentAll(currentPage.value, 10)

      dataList.value = res.data as IBlogResultListType[]
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

    getData()

    return {
      dataList,
      currentPage,
      onChange
    }
  }
})
</script>
