import hyRequest from '~/service'
import { IBlogResultType } from '.'
export interface ILatelyType {
  id: number
  content: string
  updateAt: string
  moment_id: number
  user: {
    id: number
    name: string
    logo: string
  }
}

enum sideBarApi {
  latelyCommentList = '/latelyComment'
}

export const requestLatelyCommentList = () => {
  return hyRequest.get<IBlogResultType<ILatelyType[]>>({
    url: sideBarApi.latelyCommentList
  })
}
