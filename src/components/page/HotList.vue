<template>
  <div class="hotlist flex flex-col">
    <Hot :data="dataList" />
    <a-pagination
      :current="currentPage"
      :pageSize="10"
      :total="200"
      show-quick-jumper
      hideOnSinglePage
      class="my-3"
      @change="onChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { requestBlogList, IBlogResultListType } from '~/api'

export default defineComponent({
  setup() {
    const currentPage = ref(1)
    const dataList = ref<IBlogResultListType[]>([])

    const getData = async () => {
      const res = await requestBlogList(currentPage.value, 10)

      dataList.value = res.data
    }

    const onChange = (page: number) => {
      currentPage.value = page
      getData()

      window.scrollTo({
        top: 0,
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
