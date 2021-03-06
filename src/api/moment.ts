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
  createMoment = '/moment/',
  // 文章列表搜索接口
  momentSearch = '/moment/search/1',
  momentEdit = '/moment/' //moment/id
}

export interface IMomentType {
  title: string
  content: string
  momentId: number

  agree: number
  isAgree: number
  commentCount: number
  look: number

  createTime: string
  updateTime: string

  images: string[]

  audit?: number

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

export interface IMomentCountList {
  lookResult: {
    id: number
    name: string
    value: number
    lookCount: number
  }[]
  agreeResult: IMomentCount[]
  commentResult: IMomentCount[]
}
export interface IMomentCount {
  id: number
  name: string
  value: number
}

// 随便看看接口
export const requestCauseList = (page: number = 1) => {
  const offset = page === 1 ? 0 : (page - 1) * 6

  return hyRequest.get<IResponsType<IMomentType[]>>({
    url: momentApi.caustList,
    params: {
      offset
    }
  })
}

// 热门动态接口
export const requestHotseeList = (type: number = 0) => {
  return hyRequest.get<IResponsType<IMomentType[]>>({
    url: momentApi.hotseeList,
    params: {
      type
    }
  })
}

// 全部动态接口
// moment + label -> 按类型
// moment + userId -> 按userId
// moment -> 全部
export const requestMomentAll = (offset: number, limit: number = 10) => {
  const offsetC = offset === 1 ? 0 : (offset - 1) * limit

  return hyRequest.get<IMomentListType>({
    url: momentApi.MomentAll,
    params: {
      limit,
      offset: offsetC
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
  return hyRequest.post<IResponsType<any>>({
    // url: 'moment/1/like'
    url: momentApi.momentLike + momentId + '/like'
  })
}

export const requestMomentEdit = (id: number, data: ICreateMoment) => {
  return hyRequest.post<IResponsType<any>>({
    url: momentApi.momentEdit + id,
    data
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

// 教程笔记 文章搜索接口
export const requestMomentSearch = (data: {
  keyBoard: string
  label: number
  sort: number
  offset: number
  limit: number
}) => {
  const offsetC = data.offset === 1 ? '0' : (data.offset - 1) * data.limit

  return hyRequest.get<IResponsType<IMomentListByLabelType>>({
    url: momentApi.momentSearch,
    params: {
      ...data,
      offset: offsetC
    }
  })
}

// 浏览动态接口
export const requestMomentLook = (momentId: number, userId: number) => {
  return hyRequest.post({
    url: '/moment/' + momentId + '/look',
    data: {
      userId
    }
  })
}

// 文章信息统计接口
export const requestMomentInfo = () => {
  return hyRequest.get<IResponsType<IMomentCountList>>({
    url: '/moment/momentInfo/1'
  })
}

export interface ILatelyDataType {
  today: number
  yesterday: number
  week: number
  month: number
  all: number
}
// 文章信息统计接口
export const requestMomentData = (type: number) => {
  return hyRequest.get<IResponsType<ILatelyDataType>>({
    url: '/moment/momentData/1',
    params: {
      type
    }
  })
}

export interface IDataByDayItem {
  value: string
  datatime: string
}

export interface IDataByDay {
  momentCount: IDataByDayItem[]
  agreeCount: IDataByDayItem[]
  lookCount: IDataByDayItem[]
  commentCount: IDataByDayItem[]
}

// 按天查数据
export const requestDataByDay = () => {
  return hyRequest.get<IResponsType<IDataByDay>>({
    url: '/moment/dataByDay/1'
  })
}

export interface IBackSearch {
  keyBoard: string
  sort: number
  limit: number
  offset: number
  audit: number
}

// 后台文章搜索
export const requestBackMomentListAll = (data: IBackSearch) => {
  return hyRequest.get<IResponsType<IMomentListType>>({
    url: '/moment/back/search/1',
    params: data
  })
}

// 审核
export const requestBackAudit = (id: number, type: number) => {
  return hyRequest.post<IResponsType<string>>({
    url: '/moment/' + id + '/back/audit',
    data: {
      type
    }
  })
}

// 文章删除接口
export const requestBackMomentDelete = (momentId: number) => {
  return hyRequest.delete<IResponsType<string>>({
    url: momentApi.momentDelete + momentId + '/back'
  })
}

export interface IBackLookList {
  user_id: number
  moment_id: number
  createTime: string
  moment: {
    id: number
    title: string
  }
  author: {
    id: number
    avatar: string
    nickname: string
  }
}

export interface IBackLook {
  list: IBackLookList[]
  count: number
}

export const requestBackMomentLook = (page: number) => {
  const offset = page === 1 ? 0 : (page - 1) * 20
  return hyRequest.get<IBackLook>({
    url: '/moment/back/look/1',
    params: {
      offset
    }
  })
}

export const requestBackMomentLike = (page: number) => {
  const offset = page === 1 ? 0 : (page - 1) * 10
  return hyRequest.get<IBackLook>({
    url: '/moment/back/like/1',
    params: {
      offset
    }
  })
}
