import hyRequtsr from '~/service'

export interface IRegistUserType {
  username: string
  password: string
}

export interface IRegistResultType {
  msg: string
  flag: boolean
}

enum RegisterAPI {
  RegisterUserInfo = '/users/', // 用法: /users/1
  UserMenus = '/role/' // 用法: role/1/menu
}

export const registUser = (data: IRegistUserType) => {
  return hyRequtsr.post<IRegistResultType>({
    url: RegisterAPI.RegisterUserInfo,
    data
  })
}
