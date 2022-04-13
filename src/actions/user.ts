import localCache from '~/utils/cache'

export const getUserInfo = async () => {
  const userInfo = localCache.getCache('user')

  return {
    code: 0,
    data: userInfo
  }
}
