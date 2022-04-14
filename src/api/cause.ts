import hyRequest from '~/service'
import { IResponsType } from './index'

export interface ICauseListType {
  content: string
  createAt: string
  id: number
  like: number
  title: string
  updateAt: string
  user_id: number
  logo: string
}

enum CauseApi {
  list = '/cause'
}

export const requestCauseList = (id: number) => {
  return hyRequest.get<IResponsType<ICauseListType[]>>({
    url: CauseApi.list,
    params: {
      page: id.toString()
    }
  })
}
