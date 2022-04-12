import hyRequest from '~/service'

export interface IResponsType<T> {
  code: number
  msg: string
  data?: T
  flag: boolean
}

export interface IUserInfoType {
  age: number
  desc: string
  email: string
  id: number
  password: string
  sex: string
  telPhone: string
  type: number
  username: string
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
