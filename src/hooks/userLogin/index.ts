import localCache from '~/utils/cache'
import { requestUserLogin, IUserType } from '~/api'
import { message } from 'ant-design-vue'

export const handleUserLogin = async (accountInfo: IUserType) => {
  const { flag, data, msg } = await requestUserLogin(accountInfo)

  if (!flag) {
    message.warn(msg, 3)
    return
  }

  localCache.setCache('token', data.token)
  message.success(msg, 3)

  return true
}
