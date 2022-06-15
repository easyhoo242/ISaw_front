import axios from 'axios'

import localcache from '~/utils/cache'

// import { IResponsType } from './index'

const { token } = localcache.getCache('user') || {
  token: 'unLogin'
}

// enum uploadApi {
//   piciutr = '/api/upload/',
//   avatar = '/api/upload/avatar'
// }

const baseUrl = 'http://120.48.82.2:8005'

export function getUplodBackName(momentId: number, parameter: any) {
  return axios({
    url: process.env.NODE_ENV === 'production' ? `${baseUrl}/upload/${momentId}/picture` : `/api/upload/${momentId}/picture`,
    method: 'post',
    // 传输文件流需要单独设置请求头
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    },
    data: parameter
  })
}

export function uploadAvatar(parameter: any) {
  return axios({
    url: process.env.NODE_ENV === 'production' ? `${baseUrl}/upload/avatar` : '/api/upload/avatar',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    },
    data: parameter
  })
}

// :action="`/upload/${blogId}/picture`"
