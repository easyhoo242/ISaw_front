import hyRequest from '~/service'

export interface IResponsType<T> {
  code: number
  msg: string
  data?: T
  flag: boolean
}

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

enum UserDetailApi {
  Detail = '/users/' // /users/ + id
}

export const getUserDetail = (userId: number) => {
  return hyRequest.get<IResponsType<IUserInfoType>>({
    url: UserDetailApi.Detail + userId
  })
}
