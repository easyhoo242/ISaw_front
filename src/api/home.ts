import hyRequest from '~/service'

import { IResponsType } from './index'

export interface IUserInfoType {
  id: number
  username: string
  name: string
  desc: string
  age: number
  sex: string
  telPhone: string
  email: string
  type: number
  vip: number
  logo: string
  look: number
  momentCount: number
  commentCount: number
}

export interface IModuleTo<T> {
  list: T
  name: string
}

export interface IModuleToList {
  createAt: string
  id: number
  title: string
  type: string
}
enum HomelApi {
  Detail = '/users/', // /users/ + id
  ModuleTo = '/momentByType'
}

export const getUserDetail = (userId: number) => {
  return hyRequest.get<IResponsType<IUserInfoType>>({
    url: HomelApi.Detail + userId
  })
}

export const requestModuleTo = () => {
  return hyRequest.get<IResponsType<IModuleTo<IModuleToList[]>>>({
    url: HomelApi.ModuleTo
  })
}
