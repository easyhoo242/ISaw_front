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
  blogList = '/moment',
  createBlog = '/moment',
  getCommentList = '/comment/',
  postComment = '/comment'
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

export interface ICreateBlogType {
  title: string
  content: string
  type: number
}

export const createBlog = (data: ICreateBlogType) => {
  return hyRequest.post<IResponsType<any>>({
    url: BlogApi.createBlog,
    data
  })
}

// 评论功能

interface IUser {
  id: number
  logo: string
  name: string
}
export interface ICommentType {
  father: {
    content: string
    id: number
    createAt: string
    user: IUser
  }[]

  son: {
    comment_id: number
    content: string
    createAt: string
    id: number
    user: IUser
  }[]

  count: number
}

export const requestCommentList = (
  momentId: number,
  page: number,
  pagesize: number
) => {
  return hyRequest.get<IResponsType<ICommentType>>({
    url: BlogApi.getCommentList,
    params: {
      momentId,
      page: page,
      pageSize: pagesize
    }
  })
}

// 发表评论

export const postComment = (momentId: number, content: string) => {
  return hyRequest.post<IResponsType<any>>({
    url: BlogApi.postComment,
    data: {
      userId: userInfo.id,
      momentId,
      content
    }
  })
}
