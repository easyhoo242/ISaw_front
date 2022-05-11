export * from './sideBar'
export * from './blog'
export * from './home'
export * from './moment'
export * from './user'

export interface IResponsType<T> {
  code: number
  msg: string
  data?: T
  flag: boolean
}

export const BASE_LOGO =
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.3xm.com.cn%2Fimages%2Fb%2F204%2F3702022602375856066119.jpg&refer=http%3A%2F%2Fimg.3xm.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652477933&t=e22aae556d7468713c7c49ce3d2537fd'

export const BASE_HEAD_LOGO = '../../public/headogo.jpg'
