<template>
  <BranchCrumb route="正文" />
  <Module> 123 </Module>
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
import Content from '../../components/page/blog/Content.vue'
import Comment from '../../components/page/blog/Comment.vue'

export default defineComponent({
  setup() {
    return {}
  },
  components: { Content, Comment }
})
</script>

<style lang="less" scoped></style>
