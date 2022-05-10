import hyRequest from '~/service'

import { IResponsType } from './index'

enum UserAPI {
  registUser = '/users/', //注册 用法: /users/1
  loginUser = '/login', //登录
  userDetail = '/users/', //'/users/'' + id
  ChangeUserInfo = '/users/changeInfo' //修改信息
}

export interface IAccount {
  username: string
  password: string
}
export interface IUserInfoType {
  id: number
  username: string
  nickname: string
  slogan: string
  age: number
  sex: string
  telPhone: string
  email: string
  type: number
  vip: number
  agree: number
  avatar: string
  moment_count: number
  comment_count: number
}

export interface IChangeUserInfo {
  name: string
  sex: string
  age: number
  email: string
  telPhone: string
  slogan: string
  userId: number
}

export interface ILoginResult {
  id: number
  username: string
  nickname: string
  avatarUrl: string
  token: string
}

// 注册
export const registUser = (data: IAccount) => {
  return hyRequest.post<IResponsType<any>>({
    url: UserAPI.registUser,
    data
  })
}

// 登录
export function loginUser(account: IAccount) {
  return hyRequest.post<IResponsType<ILoginResult>>({
    url: UserAPI.loginUser,
    data: account
  })
}

// 获取用户信息
export function getUserDetail(userId: number) {
  return hyRequest.get<IResponsType<IUserInfoType>>({
    url: UserAPI.userDetail + userId
  })
}

// 修改信息
export const changeUserInfo = (data: IChangeUserInfo) => {
  return hyRequest.post<IResponsType<any>>({
    url: UserAPI.ChangeUserInfo,
    data
  })
}
