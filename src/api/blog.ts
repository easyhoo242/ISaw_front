import hyRequest from '~/service'

export interface IBlogResultType {}

enum BlogApi {
  blogList = '/moment'
}

export const requestBlogList = (currentPage: number, pageSize: number) => {
  return hyRequest.get<IBlogResultType>({
    url: BlogApi.blogList,
    params: {
      page: currentPage,
      page_size: pageSize
    }
  })
}
