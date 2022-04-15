<template>
  <BranchCrumb route="正文" />
  <BlogHeader />
  <FlexCol>
    <template #body>
      <Content />
      <Comment />
    </template>

    <template #side>
      <Sidebar>
        <Casual />
        <TagList />
      </Sidebar>
    </template>
  </FlexCol>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { requestCommentList } from '~/api'

export default defineComponent({
  setup() {
    const getData = async () => {
      const res = await requestCommentList(205)

      console.log(res)
    }

    getData()

    return {}
  }
})
</script>

<style lang="less" scoped></style>
