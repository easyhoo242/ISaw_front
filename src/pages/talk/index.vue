<template>
  <BranchCrumb route="闲言碎语" />
  <Navigation
    :data="NAVIGATION_LIST"
    :label="currentLabel"
    @change="handleGetInfo"
  />

  <TalkList :data="talkList" />

  <a-pagination
    v-model="currentPage"
    :default-current="2"
    :total="total"
    show-quick-jumper
    class="mt-4"
    @change="handlePageChange"
  />
</template>

<route lang="yaml">
meta:
  layout: fullpage
</route>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { NAVIGATION_LIST, requestMomentSearch } from '~/api'
import type { IMomentType } from '~/api'

interface ICurrentInfo {
  keyBoard: string
  label: number
  sort: number
  offset: number
  limit: number
}

export default defineComponent({
  name: '闲言碎语',
  setup(props) {
    const currentPage = ref(1)
    const currentLabel = ref(3)
    const total = ref(10)

    const currentInfo = reactive<ICurrentInfo>({
      keyBoard: '',
      label: 3,
      sort: 0,
      offset: currentPage.value,
      limit: 16
    })

    const talkList = ref<IMomentType[]>([])

    const getData = async () => {
      const res = await requestMomentSearch(currentInfo)

      talkList.value = res.data?.list!
      total.value = res.data?.momentCount!

      console.log(res)
    }

    // 拿到数据
    const handleGetInfo = (data: {
      keyboard: string
      preKeyboard: string
      type: number
      sort: number
    }) => {
      currentInfo.keyBoard = data.preKeyboard
      currentInfo.label = data.type
      currentInfo.sort = data.sort
      currentInfo.offset = currentPage.value

      getData()
    }

    const handlePageChange = (page: number) => {
      currentPage.value = page
      getData()
    }

    onMounted(() => {
      getData()
    })

    return {
      NAVIGATION_LIST,
      currentPage,
      total,
      currentLabel,
      talkList,
      handleGetInfo,
      handlePageChange
    }
  }
})
</script>

<style lang="less" scoped></style>
