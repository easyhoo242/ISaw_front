<template>
  <div>
    <BranchCrumb route="互联网" />
    <Navigation :data="navigationList" />

    <FlexCol>
      <template #body>
        <Overlay class="mb-0" />
        <div>
          <Moment v-for="item in hotList" :key="item.momentId" :data="item" />

          <a-pagination
            :current="currentPage"
            :pageSize="10"
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
import { requestMomentAll } from '~/api'
import type { IMomentType } from '~/api'

export default defineComponent({
  name: '关于',
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
        top: 529,
        behavior: 'smooth'
      })
    }

    onMounted(() => {
      getData()
    })

    return {
      navigationList: [
        {
          label: '分类',
          value: 'type',
          children: [
            {
              label: '互联网',
              value: 'net',
              type: 2,
              url: ''
            },
            {
              label: '教程笔记',
              value: 'subject',
              type: 3,
              url: ''
            },
            {
              label: '闲言碎语',
              value: 'talk',
              type: 4,
              url: ''
            }
          ]
        },
        {
          label: '排序',
          value: 'sort',
          children: [
            {
              label: '浏览',
              value: 'look',
              url: ''
            },
            {
              label: '评论',
              value: 'comment',
              url: ''
            }
          ]
        }
      ],
      handlePageChange,
      hotList,
      currentPage,
      total
    }
  }
})
</script>

<style lang="less" scoped></style>
