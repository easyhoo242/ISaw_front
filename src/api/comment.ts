import hyRequest from '~/service'
import { IResponsType } from './index'

export interface ILatelyCommentType {
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

enum sideBarApi {
  latelyCommentList = '/comment/lately/1'
}

export const requestLatelyCommentList = () => {
  return hyRequest.get<IResponsType<ILatelyCommentType[]>>({
    url: sideBarApi.latelyCommentList
  })
}
