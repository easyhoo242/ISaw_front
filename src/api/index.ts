export * from './comment'
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

export interface INavigationType {
  name: string
  value: string
  children: {
    name: string
    label: number
  }[]
}

export const NAVIGATION_LIST: INavigationType[] = [
  {
    name: '分类',
    value: 'type',
    children: [
      {
        name: '互联网',
        label: 1
      },
      {
        name: '教程笔记',
        label: 2
      },
      {
        name: '闲言碎语',
        label: 3
      }
    ]
  },
  {
    name: '排序',
    value: 'sort',
    children: [
      {
        name: '最新',
        label: 0
      },
      {
        name: '点赞',
        label: 1
      },
      {
        name: '评论',
        label: 2
      },
      {
        name: '浏览量',
        label: 3
      }
    ]
  }
]

export const usernameRule = /^[a-zA-Z0-9]{4,16}$/
export const passwordRule =
  /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{4,16}$/
