<template>
  <div>
    <BranchCrumb route="互联网" />
    <Navigation :data="navigationList" @change="handleGetInfo" />

    <FlexCol>
      <template #body>
        <Overlay class="mb-0" />
        <div>
          <Moment v-for="item in hotList" :key="item.momentId" :data="item" />

          <a-pagination
            :current="currentPage"
            v-model:pageSize="pageSize"
            :total="total"
            show-quick-jumper
            hideOnSinglePage
            class="my-3"
            @change="handlePageChange"
          />
        </div>
      </template>
      <template #side>
        <SideBar>
          <Lately />
          <!-- 随便看看 -->
          <Casual />
          <!-- 热门文章 -->
          <HotSee />
        </SideBar>
      </template>
    </FlexCol>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from 'vue'
import { requestMomentSearch } from '~/api'
import type { IMomentType } from '~/api'

interface ICurrentInfo {
  keyBoard: string
  label: number
  sort: number
  offset: number
  limit: number
}

export default defineComponent({
  name: '关于',
  setup() {
    const currentPage = ref(1)
    const total = ref(20)
    const pageSize = ref(7)
    const hotList = ref<IMomentType[]>([])

    const currentInfo = reactive<ICurrentInfo>({
      keyBoard: '',
      label: 1,
      sort: 0,
      offset: currentPage.value,
      limit: pageSize.value
    })

    const getData = async () => {
      const res = await requestMomentSearch(currentInfo)

      hotList.value = res.data?.list!
      total.value = res.data?.momentCount!
    }

    const handlePageChange = (page: number) => {
      currentPage.value = page
      getData()

      window.scrollTo({
        top: 529,
        behavior: 'smooth'
      })
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
      currentInfo.limit = pageSize.value

      getData()
    }

    onMounted(() => {
      getData()
    })

    return {
      navigationList: [
        {
          name: '分类',
          value: 'type',
          children: [
            {
              name: '互联网',
              label: 1
            },
            {
              name: '教程笔记',
              label: 2
            },
            {
              name: '闲言碎语',
              label: 3
            }
          ]
        },
        {
          name: '排序',
          value: 'sort',
          children: [
            {
              name: '最新',
              label: 0
            },
            {
              name: '点赞',
              label: 1
            },
            {
              name: '评论',
              label: 2
            }
          ]
        }
      ],
      handlePageChange,
      handleGetInfo,
      hotList,
      total,
      pageSize,
      currentPage
    }
  }
})
</script>

<style lang="less" scoped></style>
