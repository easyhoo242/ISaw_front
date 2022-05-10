import hyRequest from '~/service'
import { IResponsType } from '.'

export interface ILoginResult {
  id: number
  username: string
  nickname: string
  avatarUrl: string
  token: string
}

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // 用法: /users/1
  UserMenus = '/role/', // 用法: role/1/menu
  ChangeUserInfo = '/users/changeInfo'
}

export interface IUserType {
  username: string
  password: string
}

export function requestUserLogin(account: IUserType) {
  return hyRequest.post<IResponsType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

// 修改信息

export interface IChangeUserInfo {
  name: string
  sex: string
  age: number
  email: string
  telPhone: string
  slogan: string
  userId: number
}

export const changeUserInfo = (data: IChangeUserInfo) => {
  return hyRequest.post<IResponsType<any>>({
    url: LoginAPI.ChangeUserInfo,
    data
  })
}
