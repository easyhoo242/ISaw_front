import hyRequest from '~/service'
import { IResponsType } from './index'

enum momentApi {
  caustList = '/moment/cause/1',
  hotseeList = '/moment/hotsee/1',
  latelyMomentList = '/moment/lately/1',
  MomentAll = '/moment',
  // moment + label -> 按类型
  // moment + userId -> 按userId
  // moment -> 全部
  ModuleTo = '/moment', //moment + label
  momentDetail = '/moment/',
  momentLike = '/moment/', // /moment/momentId/like
  momentDelete = '/moment/', // /moment/ momentId
  createMoment = '/moment/'
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

export interface IMomentListType {
  list: IMomentType[]
  momentCount: number
}

export interface IMomentListByLabelType {
  list: IMomentType[]
  momentCount: number
  labelInfo: {
    name: string
    id: number
  }
}

export interface ICreateMoment {
  title: string
  content: string
  label: number
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

// 根据用户id获取文章列表
export const requestMomentById = (
  offset: number,
  limit: number,
  userId: number
) => {
  const offsetC = offset === 1 ? 0 : (offset - 1) * limit

  return hyRequest.get<IMomentListType>({
    url: momentApi.MomentAll,
    params: {
      limit,
      offset: offsetC,
      userId
    }
  })
}

// 最近发表文章接口
export const requestLatelyMomentList = () => {
  return hyRequest.get<IResponsType<IMomentType[]>>({
    url: momentApi.latelyMomentList
  })
}

// ModuleTo
export const requestModuleTo = (
  label: number,
  offset: number,
  limit: number = 10
) => {
  return hyRequest.get<IMomentListByLabelType>({
    url: momentApi.ModuleTo,
    params: {
      label,
      limit,
      offset
    }
  })
}

// 文章详情
export const requestMomentDetail = (momentId: number) => {
  return hyRequest.get<IMomentType>({
    url: momentApi.momentDetail + momentId
  })
}

// 文章点赞接口
export const requestMomentAgree = (momentId: number) => {
  return hyRequest.get<IResponsType<any>>({
    url: momentApi.momentLike + momentId + '/like'
    // url: 'moment/1/like'
  })
}

// 文章删除接口
export const requestMomentDelete = (momentId: number) => {
  return hyRequest.delete<IResponsType<string>>({
    url: momentApi.momentDelete + momentId
  })
}

// 作品展示接口
export const requestMomentShow = (
  offset: number,
  limit: number,
  label: number
) => {
  return hyRequest.get<IMomentListType>({
    url: momentApi.MomentAll,
    params: {
      limit,
      offset,
      label
    }
  })
}

// 发表文章
export const requestCreateMoment = (data: ICreateMoment) => {
  return hyRequest.post<IResponsType<number>>({
    url: momentApi.createMoment,
    data: data
  })
}
