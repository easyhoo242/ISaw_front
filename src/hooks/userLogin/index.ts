import localCache from '~/utils/cache'
import { requestUserLogin, IUserType, getUserDetail } from '~/api'
import { message } from 'ant-design-vue'

export const handleUserLogin = async (accountInfo: IUserType) => {
  const { flag, data, msg } = await requestUserLogin(accountInfo)

  if (!flag) {
    message.warn(msg, 3)
    return
  }

  localCache.setCache('account', accountInfo)

  localCache.setCache('token', data.token)

  const { data: userInfo } = await getUserDetail(data.id)

  localCache.setCache('user', userInfo)

  // 将用户信息存储到state
  message.success(msg, 3)

  return true
}
