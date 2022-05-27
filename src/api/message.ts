import hyRequest from '~/service'

import { IResponsType } from './index'

enum MessageApi {
  list = '/message', //get
  add = '/message', //post
  del = '/message/', // delete + messageId
  edit = '/message/' // post  + messageId
}

export const requestMessageList = () => {
  return hyRequest.get({
    url: MessageApi.list
  })
}

export const requestAddMesage = (content: string, score: number) => {
  return hyRequest.post({
    url: MessageApi.add,
    data: {
      content,
      score
    }
  })
}

export const requestDelMesage = (messageId: number) => {
  return hyRequest.delete({
    url: MessageApi.list + messageId
  })
}

export const requestEditMessage = (messageId: number) => {
  return hyRequest.post({
    url: MessageApi.list + messageId
  })
}
