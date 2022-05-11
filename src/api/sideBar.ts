import hyRequest from '~/service'
import { IResponsType } from '.'
export interface ILatelyCommentType {
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
  latelyCommentList = '/latelyComment',
  latelyMomentList = '/latelyMoment'
}

export const requestLatelyCommentList = () => {
  return hyRequest.get<IResponsType<ILatelyCommentType[]>>({
    url: sideBarApi.latelyCommentList
  })
}


