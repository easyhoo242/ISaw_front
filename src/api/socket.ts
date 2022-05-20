import hyRequest from '~/service'

export const requestSendAll = () => {
  return hyRequest.get({
    url: '/socket'
  })
}
