import hyRequest from '~/service'
import { IResponsType } from './index'

export interface ICommentType {
  id: number
  content: string
  createTime: string
  agree: number
  child_count: number
  momentId: number
  commentId: number

  user: {
    avatarUrl: string
    id: number
    nickname: string
  }
}

export interface ICommentListType {
  list: ICommentType[]
  commentCount: number
  commentCountNotNull: number
}

enum commentApi {
  latelyCommentList = '/comment/lately/1',
  getCommentList = '/comment/',
  deleteComment = '/comment/' // /comment/commentId
}

// 最新评论列表
export const requestLatelyCommentList = () => {
  return hyRequest.get<IResponsType<ICommentType[]>>({
    url: commentApi.latelyCommentList
  })
}

// 文章评论列表
export const requestCommentList = (
  page: number,
  pagesize: number,
  // 可不传
  commentId: number,
  momentId?: number
) => {
  return hyRequest.get<IResponsType<ICommentListType>>({
    url: commentApi.getCommentList,
    params: {
      offset: page,
      limit: pagesize,
      commentId,
      momentId
    }
  })
}

// 文章评论列表  二级
export const requestCommentListSon = () => {
  return hyRequest.get<IResponsType<ICommentType[]>>({
    url: commentApi.getCommentList,
    params: {
      offset: 1,
      limit: 5,
      commentId: 1
    }
  })
}

// 删除评论
export const requestCommentDelete = (commentId: number) => {
  return hyRequest.delete<IResponsType<any>>({
    url: commentApi.deleteComment + commentId
  })
}
