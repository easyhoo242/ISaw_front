import localCache from '~/utils/cache'
import hyRequest from '~/service'

const userInfo = localCache.getCache('user')

export interface IBlogResultType<T> {
  code: number
  data: T
  flag: boolean
  msg: string
}

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

enum BlogApi {
  blogList = '/moment'
}

export const requestBlogList = (currentPage: number, pageSize: number) => {
  return hyRequest.get<IBlogResultType<IBlogResultListType[]>>({
    url: BlogApi.blogList,
    params: {
      userId: userInfo.id,
      page: currentPage,
      page_size: pageSize
    }
  })
}
