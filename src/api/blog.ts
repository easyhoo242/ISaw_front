import localCache from '~/utils/cache'
import hyRequest from '~/service'

const userInfo = localCache.getCache('user')

export interface IBlogResultType {}

enum BlogApi {
  blogList = '/moment'
}

export const requestBlogList = (currentPage: number, pageSize: number) => {
  return hyRequest.get<IBlogResultType>({
    url: BlogApi.blogList,
    params: {
      userId: userInfo.id,
      page: currentPage,
      page_size: pageSize
    }
  })
}
