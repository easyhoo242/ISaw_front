// 最近发表 模块内容
export interface ILatelyType {
  id: number
  title: string
  type: string
  time: string
}

const latelyData: ILatelyType[] = [
  {
    id: 1,
    title: 'Typecho 1.2.0 来了，在安装 typecho 的时候怎么选择数据库适配器呢',
    type: '互联网',
    time: '2022月04月02日'
  },
  {
    id: 2,
    title: '微信视频号里的视频怎么下载到本地，两种方法可以帮你实现',
    type: '闲言碎语',
    time: '2022月04月01日'
  },
  {
    id: 3,
    title: '网站预加载 JS 脚本 instant.page 的使用方法',
    type: '教程笔记',
    time: '2022月03月30日'
  },
  {
    id: 4,
    title: '优化谷歌联盟广告JS加载缓慢问题，提高网站页面的加载速度',
    type: '互联网',
    time: '2022月03月29日'
  },
  {
    id: 5,
    title:
      'zbp支付宝即时到帐插件显示 count(): Parameter must be an array or an object 错误的解决办法',
    type: '教程笔记',
    time: '2022月03月25日'
  },
  {
    id: 6,
    title:
      '腾讯云虎年回馈，分享完成助力，解锁轻量云服务器2核套餐66元/年，新老用户同享',
    type: '互联网',
    time: '2022月03月24日'
  },
  {
    id: 7,
    title: '记录Apche环境下手动配置和部署SSL证书的图文教程',
    type: '互联网',
    time: '2022月03月17日'
  }
]

export function getLatelyData() {
  return new Promise((resolve) => resolve(latelyData))
}
