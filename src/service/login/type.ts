export interface IAccount {
  name: string
  password: string
}

export interface ILoginResult {
  id: number
  name: string
  token: string
}

export interface IDataType<T = any> {
  code: number
  data: T
}

export interface ILoginType<T = any> {
  flag: boolean
  code: number
  data: T
  msg: string
}
