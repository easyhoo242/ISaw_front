import request from './basic'

export const getMomentByIdC = (data: number = 23) => {
  return request.get('/moment/' + data)
}
