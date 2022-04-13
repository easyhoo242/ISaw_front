import { getUserDetail, IUserInfoType } from '~/api'

export async function getUserInfo() {
  const res = await getUserDetail(23)

  return {
    code: 0,
    data: res.data as IUserInfoType
  }
}
