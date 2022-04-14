import localCache from '~/utils/cache'
import hyRequest from '~/service'

const userInfo = localCache.getCache('user')

import { IResponsType } from '.'

export interface IBlogResultListType {
  commentCount: number
  content: string
  createTime: string
  id: number
  like: number
  momentCount: number
  title: string
  updateTime: string
  user: {
    id: number
    name: string
  }
}
export interface IBlogResultType {
  count: number
  list: IBlogResultListType
}

enum BlogApi {
  blogList = '/moment'
}



export const requestBlogListById = (currentPage: number, pageSize: number) => {
  return hyRequest.get<IResponsType<IBlogResultType>>({
    url: BlogApi.blogList,
    params: {
      userId: userInfo.id,
      page: currentPage,
      page_size: pageSize
    }
  })
}
