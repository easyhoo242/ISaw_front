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
import { defineComponent, ref, onMounted } from 'vue'
import { requestMomentSearch } from '~/api'
import type { IMomentType } from '~/api'

interface ICurrentInfo {
  currentPage: number
  pageSize: number
  keyboard: string
  preKeyboard: string
  type: number
  sort: number
}

export default defineComponent({
  name: '关于',
  setup() {
    const currentPage = ref(1)
    const total = ref(0)
    const pageSize = ref(7)
    const hotList = ref<IMomentType[]>([])

    const getData = async () => {
      const res = await requestMomentSearch(currentPage.value, pageSize.value)

      hotList.value = res.list!
      total.value = res.momentCount!
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
      const dataC: ICurrentInfo = {
        ...data,
        currentPage: currentPage.value,
        pageSize: pageSize.value
      }

      console.log(dataC)
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
              name: '全部',
              label: 0
            },
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
