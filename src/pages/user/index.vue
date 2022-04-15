<template>
  <Module title="作者发布的文章" class="user-center">
    <FlexCol>
      <template #body>
        <div class="hotlist flex flex-col">
          <Blog v-if="list?.length || 0" :data="list" />

          <Module v-else>
            <a-empty :image="simpleImage" />
          </Module>

          <a-pagination
            v-if="list?.length || 0"
            :current="currentPage"
            :pageSize="10"
            :total="total"
            show-quick-jumper
            class="my-3"
            @change="onChange"
          />
        </div>
      </template>

      <template #side>
        <SideBar>
          <Casual />
        </SideBar>
      </template>
    </FlexCol>
  </Module>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { requestBlogListById } from '~/api'
import type { IBlogResultListType } from '~/api'
import { Empty } from 'ant-design-vue'
import Module from '~/components/global/Module.vue'

export default defineComponent({
  setup() {
    const currentPage = ref(1)
    const total = ref(1)
    const list = ref<IBlogResultListType[]>()

    const getData = async () => {
      const res = (await requestBlogListById(currentPage.value, 10)).data
      console.log(res)
      list.value = res?.list as any
      total.value = res?.count || 100
    }

    const onChange = (page: number) => {
      currentPage.value = page
      getData()
      window.scrollTo({
        top: 400,
        behavior: 'smooth'
      })
    }

    getData()

    return {
      list,
      currentPage,
      total,
      onChange,
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE
    }
  },
  components: { Module }
})
</script>

<style lang="less" scoped>
.user-center {
  background: transparent !important;
  box-shadow: none !important;
}
</style>
