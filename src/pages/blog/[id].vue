<template>
  <div>
    <BranchCrumb route="正文" />
    <BlogHeader :data="headerInfo" @response="handleAgreeResponse" />
    <FlexCol>
      <template #body>
        <Content :data="currentContent" :labelInfo="labelInfo" />

        <Comment
          :data="comment"
          @submit="handleSubmit"
          @reply="handleReply"
          @delete="handleDelete"
          :total="total"
          :totalAll="totalAll"
        />

        <a-pagination
          v-if="comment.father.length"
          v-model:pageSize="pagesize"
          :current="currentPage"
          :total="total"
          hideOnSinglePage
          class="my-3"
          @change="handlePageChange"
        />
      </template>

      <template #side>
        <Casual />

        <!-- 文章操作模块 -->
        <Module v-if="isShowPermission" title="文章权限操作">
          <div class="grid grid-cols-2 grid-rows-1 gap-5 mt-3">
            <A href="javascript:void(0);" class="btn" @click="handleEditMoment">
              编辑文章
            </A>
            <A href="javascript:void(0);" class="btn">删除文章</A>
          </div>
        </Module>
      </template>
    </FlexCol>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import localCache from '~/utils/cache'
import {
  requestCommentList,
  requestCommentListSon,
  requestPostComment,
  requestReplyComment,
  requestMomentDetail,
  requestCommentDelete,
  requestMomentDelete
} from '~/api'
import type { ICommentType, IResponsType } from '~/api'
import { message, Modal } from 'ant-design-vue'

export interface headerInfo {
  id: number
  nickname: string
  avatarUrl: string
  agree: number
  isAgree: number
  count: number
  look: number

  title: string
  createTime: string

  momentId: number
}

export default defineComponent({
  setup() {
    const router = useRouter()
    const user = localCache.getCache('user')

    const isShowPermission = ref(false)

    const comment = reactive<{ father: ICommentType[]; son: ICommentType[] }>({
      father: [],
      son: []
    })
    // const reload = inject('reload', Function, true)
    const currentPage = ref(1)
    const total = ref(0)
    const totalAll = ref(0)

    //@ts-ignore
    const headerInfo = ref<headerInfo>({})

    const labelInfo = reactive<{
      id: number
      name: string
    }>({ id: 0, name: '' })

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
        isAgree: momentDetail.isAgree,
        momentId: momentDetail.momentId,
        look: momentDetail.look
      }

      labelInfo.id = momentDetail.label.id
      labelInfo.name = momentDetail.label.name

      // 是否显示权限操作按钮
      isShowPermission.value = user.id === momentDetail.author.id

      // 一级评论列表
      const res = await requestCommentList(currentPage.value, 5, 1, momentId)

      // 二级评论列表
      const resC = await requestCommentListSon()

      total.value = res.data?.commentCountNotNull!
      totalAll.value = res.data?.commentCount!

      comment.father = res.data?.list!
      comment.son = resC.data!
    }

    const handlePageChange = (page: number) => {
      currentPage.value = page

      getData()
    }

    // 删除文章
    const handleDeleteComment = () => {
      Modal.confirm({
        title: '确认删除文章？',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',

        async onOk() {
          const res = await requestMomentDelete(momentId)

          if (!res.flag) {
            message.error('删除失败~', 3)
            return
          }

          message.success('删除成功~ 2秒后跳转到首页~', 3)

          setTimeout(() => {
            router.push('/')
          }, 1500)
        },
        onCancel() {}
      })
    }

    // 发表评论
    const handleSubmit = async (currntComment: string) => {
      if (!currntComment) {
        return
      }

      const { flag, msg } = await requestPostComment(momentId, currntComment)

      if (!flag) {
        message.error('评论发表失败~', 3)
        return
      }

      message.success(msg, 3)
      // 刷新列表
      getData()
    }

    // 回复评论
    const handleReply = async (commentId: number, reply: string) => {
      if (!commentId) {
        return
      }

      const { flag, msg } = await requestReplyComment(
        momentId,
        reply,
        commentId
      )

      if (!flag) {
        message.error('评论回复失败', 2)
      }

      message.success(msg, 3)
      getData()
      // reload()
    }

    // 删除评论
    const handleDelete = async (id: number) => {
      const { flag, msg } = await requestCommentDelete(id)

      if (!flag) {
        message.error('删除失败', 2)
        return
      }

      message.success(msg, 3)

      getData()
    }

    onMounted(() => {
      getData()
    })

    //修改文章
    const handleEditMoment = () => {
      router.push({
        path: '/editBlog',
        query: {
          id: headerInfo.value.momentId
        }
      })
    }

    // 点赞响应
    const handleAgreeResponse = (res: IResponsType<string>) => {
      const { msg, flag } = res

      if (!flag) {
        message.error(msg, 3)
        return
      }

      message.success(msg, 2)
      getData()
    }

    return {
      pagesize: 5,
      comment,
      handleSubmit,
      currentPage,
      total,
      totalAll,
      handlePageChange,
      handleReply,
      headerInfo,
      labelInfo,
      currentContent,
      // 删除评论
      handleDelete,
      // 删除文章
      handleDeleteComment,
      isShowPermission,
      // 跳转到编辑页面
      handleEditMoment,
      handleAgreeResponse
    }
  }
})
</script>

<style lang="less" scoped>
.btn {
  cursor: pointer;
  padding: 4px 0;
  border-radius: 10px;
  background-color: rgb(236, 236, 236);
  text-align: center;
  font-size: 16px;
  font-weight: 600;
}
</style>
