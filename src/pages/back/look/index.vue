<template>
  <div>
    <a-list item-layout="horizontal" :data-source="data">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta>
            <template #title>
              <a :href="`/user/${item.user_id}`">{{ item.author.nickname }}</a>
            </template>
            <template #avatar>
              <a-avatar :src="item.author.avatar || BASE_HEAD_LOGO" />
            </template>
            <template #description>
              <span>浏览了文章：</span>
              <A :href="`/blog/${item.moment_id}`">
                {{ item.moment.title }}
              </A>
              <span>
                于<b> {{ item.createTime }}</b>
              </span>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>

    <a-pagination
      :current="currentPage"
      :pageSize="20"
      :total="total"
      show-quick-jumper
      hideOnSinglePage
      class="my-3 text-right"
      @change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { requestBackMomentLook, BASE_HEAD_LOGO } from '~/api'
import type { IBackLookList } from '~/api'

const data = ref<IBackLookList[]>([])
const total = ref(0)

const currentPage = ref(1)

const handlePageChange = (page: number) => {
  currentPage.value = page
  getData()
}

const getData = async () => {
  const res = await requestBackMomentLook(currentPage.value)

  data.value = res.list
  total.value = res.count
}

onMounted(() => {
  getData()
})
</script>

<route lang="yaml">
meta:
  layout: back
</route>
