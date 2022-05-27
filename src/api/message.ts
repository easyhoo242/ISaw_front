import hyRequest from '~/service'

import { IResponsType } from './index'

enum MessageApi {
  list = '/message', //get
  add = '/message', //post
  del = '/message/', // delete + messageId
  edit = '/message/' // post  + messageId
}

export interface IMessageList {
  id: number
  content: string
  score: number
  createTime: string
  user: {
    id: number
    nickname: string
    avatarUrl: string
  }
}

interface IMessage {
  list: IMessageList[]
  count: number
}

export interface IMessageContent {
  content: string
  score: number
}

export const requestMessageList = () => {
  return hyRequest.get<IResponsType<IMessage>>({
    url: MessageApi.list
  })
}

export const requestAddMesage = (content: string, score: number) => {
  return hyRequest.post<IResponsType<IMessage>>({
    url: MessageApi.add,
    data: {
      content,
      score
    }
  })
}

export const requestDelMesage = (messageId: number) => {
  return hyRequest.delete<IResponsType<IMessage>>({
    url: MessageApi.del + messageId
  })
}

export const requestEditMessage = (
  messageId: number,
  data: IMessageContent
) => {
  return hyRequest.post<IResponsType<string>>({
    url: MessageApi.edit + messageId,
    data
  })
}
