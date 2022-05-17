import hyRequest from '~/service'

import { IResponsType } from './index'

enum UserAPI {
  registUser = '/users/', //注册 用法: /users/1
  loginUser = '/login', //登录
  userDetail = '/users/', //'/users/'' + id
  ChangeUserInfo = '/users/', //修改信息
  ChangeUserPsw = '/users/' //修改密码
}

export interface IAccount {
  username: string
  password: string
}
export interface IUserInfoType {
  id: number
  username: string
  nickname: string
  avatar: string
  moment_count: number
  comment_count: number
  agree_count: number

  // 暂时没有的字段
  age: number
  sex: string
  email: string
  telPhone: string
  desc: string
  // 1 普通  6 会员  9 管理员
  type: number
}

export interface IUser {
  nickname: string
  sex: string
  age: number
  email: string
  telPhone: string
  desc: string
}

export interface IChangePsw {
  oldPsw: string
  newPsw: string
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
export const changeUserInfo = (userId: number, data: IUser) => {
  return hyRequest.post<IResponsType<string>>({
    url: UserAPI.ChangeUserInfo + userId,
    data
  })
}

export const changeUserPsw = (userId: number, data: IChangePsw) => {
  return hyRequest.post<IResponsType<string>>({
    url: UserAPI.ChangeUserPsw + userId + '/psw',
    data
  })
}
