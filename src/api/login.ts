import hyRequest from '~/service'

export interface IAccount {
  name: string
  password: string
}

export interface ILoginResult {
  id: number
  username: string
  token: string
}

export interface ILoginType<T = any> {
  flag: boolean
  code: number
  data: ILoginResult
  msg: string
}

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', // 用法: /users/1
  UserMenus = '/role/' // 用法: role/1/menu
}

export interface IUserType {
  username: string
  password: string
}

export function requestUserLogin(account: IUserType) {
  return hyRequest.post<ILoginType>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}
