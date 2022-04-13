import localCache from '~/utils/cache'
import { getUserDetail, IUserInfoType } from '~/api'

export async function getUserInfo() {
  const token = localCache.getCache('token')

  if (!token) {
    console.log('没有获取到token')
    return
  }

  const res = (await getUserDetail(23)) || {
    data: {
      id: 23
    }
  }

  console.log(res)

  return {
    code: 0,
    data: {
      ...(res.data as IUserInfoType),
      id: 23
    }
  }
}
