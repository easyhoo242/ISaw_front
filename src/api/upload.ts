import axios from 'axios'

import localcache from '~/utils/cache'

// import { IResponsType } from './index'

const { token } = localcache.getCache('user') || {
  token: 'unLogin'
}

enum uploadApi {
  piciutr = '/api/upload/',
  avatar = '/api/upload/avatar'
}

export function getUplodBackName(momentId: number, parameter: any) {
  return axios({
    url: uploadApi.piciutr + momentId + '/picture',
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
    url: uploadApi.avatar,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    },
    data: parameter
  })
}

// :action="`/upload/${blogId}/picture`"
