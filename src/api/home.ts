import hyRequest from '~/service'

import { IResponsType } from './index'

import type { IBlogResultListType } from './blog'

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
  ModuleTo = '/momentByType',
  MomentAll = '/momentListAll'
}

export const requestModuleTo = () => {
  return hyRequest.get<IResponsType<IModuleTo<IModuleToList[]>>>({
    url: HomelApi.ModuleTo
  })
}

export const requestMomentAll = (page: number, pagesize: number) => {
  return hyRequest.get<IResponsType<IBlogResultListType[]>>({
    url: HomelApi.MomentAll,
    params: {
      page,
      pagesize
    }
  })
}
