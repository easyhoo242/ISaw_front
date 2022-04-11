import request from './basic'

export interface IRegistUserType {
  username: string
  password: string
}

export const registUser = (data: IRegistUserType) => {
  return request.post('/users', data)
}
