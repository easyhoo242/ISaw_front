import localCache from '~/utils/cache'
import { requestUserLogin } from '~/api'
import type { IUserType } from '~/api'
import { message } from 'ant-design-vue'

export const handleUserLogin = async (accountInfo: IUserType) => {
  const { flag, data, msg } = await requestUserLogin(accountInfo)

  if (!flag) {
    message.warn(msg, 3)
    return
  }

  // 存储用户名密码
  localCache.setCache('account', accountInfo)

  // 将用户信息存储到state
  localCache.setCache('user', data)

  // 提示登陆成功
  message.success(msg, 3)

  return true
}
