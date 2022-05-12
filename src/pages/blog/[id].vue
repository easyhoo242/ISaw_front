<template>
  <BranchCrumb route="正文" />
  <BlogHeader :data="headerInfo" />
  <FlexCol>
    <template #body>
      <Content :data="currentContent" />
      <Comment
        :data="commentList"
        @submit="handleSubmit"
        @reply="handleReply"
        :total="total"
      />

      <a-pagination
        v-if="commentList?.father.length"
        :current="currentPage"
        :pageSize="10"
        :total="total"
        show-quick-jumper
        hideOnSinglePage
        class="my-3"
        @change="handlePageChange"
      />
    </template>

    <template #side>
      <Sidebar>
        <Casual />
      </Sidebar>
    </template>
  </FlexCol>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, inject } from 'vue'
import {
  requestCommentList,
  postComment,
  postReplyComment,
  requestMomentDetail
} from '~/api'
import type { ICommentType } from '~/api'
import { message } from 'ant-design-vue'

interface headerInfo {
  id: number
  nickname: string
  avatarUrl: string
  agree: number
  count: number
}

export default defineComponent({
  inject: ['reload'],
  setup() {
    const commentList = ref<ICommentType>()
    const reload = inject('reload', Function, true)
    const currentPage = ref(0)
    const total = ref(5)

    //@ts-ignore
    const headerInfo = ref<headerInfo>({})
    const currentContent = ref('')

    const momentId = parseInt(window.location.pathname.split('/')[2])

    const getData = async () => {
      // 文章详情
      const momentDetail = (await requestMomentDetail(momentId))!

      console.log('detail', momentDetail)
      // 正文
      currentContent.value = momentDetail.content

      // 表头
      headerInfo.value = {
        ...momentDetail?.author,
        count: momentDetail.commentCount,
        agree: momentDetail.agree
      }

      // 评论列表
      const res = await requestCommentList(momentId, currentPage.value, 5)

      commentList.value = res.data as ICommentType
      total.value = res.data?.count as number
    }

    const handlePageChange = (page: number) => {
      currentPage.value = page

      getData()
    }

    // 发表评论
    const handleSubmit = async (currntComment: string) => {
      if (!currntComment) {
        return
      }

      const res = await postComment(momentId, currntComment)

      if (!res.flag) {
        message.error('评论发表失败~', 3)
        return
      }

      message.success('评论发表成功~', 3)
      // 刷新列表
      getData()
      reload()
    }

    // 回复评论
    const handleReply = async (commentId: number, reply: string) => {
      if (!commentId) {
        return
      }

      const { flag, msg } = await postReplyComment(momentId, reply, commentId)

      if (!flag) {
        message.error(msg, 2)
      }

      message.success(msg, 3)
      getData()
      reload()
    }

    onMounted(() => {
      getData()
    })

    return {
      commentList,
      handleSubmit,
      currentPage,
      total,
      handlePageChange,
      handleReply,
      headerInfo,
      currentContent
    }
  }
})
</script>

<style lang="less" scoped></style>
