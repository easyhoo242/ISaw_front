import hyRequest from '~/service'
import { IResponsType } from './index'

export interface IListType {
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
  caustList = '/cause',
  hotseeList = '/hotsee'
}

export const requestCauseList = (id: number) => {
  return hyRequest.get<IResponsType<IListType[]>>({
    url: CauseApi.caustList,
    params: {
      page: id.toString()
    }
  })
}

export const requestHotseeList = () => {
  return hyRequest.get<IResponsType<IListType[]>>({
    url: CauseApi.hotseeList
  })
}
