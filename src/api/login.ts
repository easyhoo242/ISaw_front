import request from './basic'

export interface IUserType {
  username: string
  password: string
}

export const registUser = (data: IUserType) => {
  return request.post('/users', data)
}

export const login = (data: IUserType) => {
  return request.post('/login', data)
}

export const getTest = () => {
  return request.get('/moment?page=1&page_size=10')
}
