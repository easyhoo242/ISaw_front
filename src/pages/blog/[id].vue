<template>
  <BranchCrumb route="正文" />
  <BlogHeader :data="headerInfo" />
  <FlexCol>
    <template #body>
      <Content :data="currentContent" />
      <Comment
        :data="comment"
        @submit="handleSubmit"
        @reply="handleReply"
        :total="total"
      />

      <a-pagination
        v-if="comment.father.length"
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
import { defineComponent, ref, reactive, onMounted, inject } from 'vue'
import {
  requestCommentList,
  requestCommentListSon,
  requestPostComment,
  postReplyComment,
  requestMomentDetail
} from '~/api'
import type { ICommentType } from '~/api'
import { message } from 'ant-design-vue'

export interface headerInfo {
  id: number
  nickname: string
  avatarUrl: string
  agree: number
  count: number

  title: string
  createTime: string

  momentId: number
}

export default defineComponent({
  inject: ['reload'],
  setup() {
    const comment = reactive<{ father: ICommentType[]; son: ICommentType[] }>({
      father: [],
      son: []
    })
    const reload = inject('reload', Function, true)
    const currentPage = ref(1)
    const total = ref(5)

    //@ts-ignore
    const headerInfo = ref<headerInfo>({})
    const currentContent = ref('')

    const momentId = parseInt(window.location.pathname.split('/')[2])

    const getData = async () => {
      // 文章详情
      const momentDetail = (await requestMomentDetail(momentId))!

      // 正文
      currentContent.value = momentDetail.content

      // 表头
      headerInfo.value = {
        ...momentDetail?.author,
        title: momentDetail.title,
        createTime: momentDetail.createTime,
        count: momentDetail.commentCount,
        agree: momentDetail.agree,
        momentId: momentDetail.momentId
      }

      // 一级评论列表
      const res = await requestCommentList(currentPage.value, 5, 1, momentId)

      // 二级评论列表
      const resC = await requestCommentListSon()

      console.log(resC, 'resc')

      total.value = res.data?.commentCountNotNull!

      comment.father = res.data?.list!
      comment.son = resC.data!
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

      const res = await requestPostComment(momentId, currntComment)

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
      comment,
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
