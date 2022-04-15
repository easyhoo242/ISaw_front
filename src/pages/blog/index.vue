<template>
  <BranchCrumb route="正文" />
  <BlogHeader />
  <FlexCol>
    <template #body>
      <Content />
      <Comment :data="commentList" @submit="handleSubmit" />
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
import { defineComponent, ref, inject } from 'vue'
import { requestCommentList, postComment } from '~/api'
import type { ICommentType } from '~/api'
import { message } from 'ant-design-vue'

export default defineComponent({
  inject: ['reload'],
  setup() {
    const commentList = ref<ICommentType>()

    const reload = inject('reload', Function, true)

    const getData = async () => {
      const res = await requestCommentList(205)

      commentList.value = res.data as ICommentType
    }

    const handleCreateComment = async (content: string) => {
      const res = await postComment(205, content)

      if (!res.flag) {
        message.error('评论发表失败~', 3)
        return
      }

      message.success('评论发表成功~', 3)
    }

    const handleSubmit = (currntComment: string) => {
      if (!currntComment) {
        return
      }

      handleCreateComment(currntComment)
      // 刷新列表
      getData()
      reload()
    }

    getData()

    return {
      commentList,
      handleSubmit
    }
  }
})
</script>

<style lang="less" scoped></style>
