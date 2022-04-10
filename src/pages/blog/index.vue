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

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped></style>
