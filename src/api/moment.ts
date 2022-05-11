import hyRequest from '~/service'
import { IResponsType } from './index'

export interface ICauseType {
  title: string
  content: string
  momentId: number

  agree: number
  isAgree: number
  commentCount: number

  createTime: string
  updateTime: string

  images: string[]

  label: {
    id: number
    name: string
  }

  author: {
    avatarUrl: string
    id: number
    nickname: string
  }
}

// label:

// [[Prototype]]: Object

enum CauseApi {
  caustList = '/moment/cause/1',
  hotseeList = '/moment/hotsee/1'
}

// 随便看看接口
export const requestCauseList = () => {
  return hyRequest.get<IResponsType<ICauseType[]>>({
    url: CauseApi.caustList
  })
}

// 热门动态接口
export const requestHotseeList = () => {
  return hyRequest.get<IResponsType<ICauseType[]>>({
    url: CauseApi.hotseeList
  })
}
