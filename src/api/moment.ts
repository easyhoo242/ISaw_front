import hyRequest from '~/service'
import { IResponsType } from './index'

enum momentApi {
  caustList = '/moment/cause/1',
  hotseeList = '/moment/hotsee/1',
  MomentAll = '/moment',
  // moment + label -> 按类型
  // moment + userId -> 按userId
  // moment -> 全部
  ModuleTo = '/momentByType'
}

export interface IMomentType {
  title: string
  content: string
  momentId: number

  agree: number
  commentCount: number

  createTime: string
  updateTime: string

  images: string[]

  label: {
    id: number
    name: string
  }

  author: {
    id: number
    avatarUrl: string
    nickname: string
  }
}

export interface IModuleTo {
  list: {
    createAt: string
    id: number
    title: string
    type: string
  }[]
  name: string
}

export interface IMomentListType {
  list: IMomentType[]
  momentCount: number
}

// 随便看看接口
export const requestCauseList = () => {
  return hyRequest.get<IResponsType<IMomentType[]>>({
    url: momentApi.caustList
  })
}

// 热门动态接口
export const requestHotseeList = () => {
  return hyRequest.get<IResponsType<IMomentType[]>>({
    url: momentApi.hotseeList
  })
}

// 全部动态接口
// moment + label -> 按类型
// moment + userId -> 按userId
// moment -> 全部
export const requestMomentAll = (offset: number, limit: number = 10) => {
  return hyRequest.get<IResponsType<IMomentListType>>({
    url: momentApi.MomentAll,
    params: {
      limit,
      offset
    }
  })
}

export const requestModuleTo = () => {
  return hyRequest.get<IResponsType<IModuleTo>>({
    url: momentApi.ModuleTo
  })
}
