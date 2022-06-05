import hyRequest from '~/service'

export const requestSocketList = () => {
  return hyRequest.get({
    url: '/socket'
  })
}
