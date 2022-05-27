import { hhhWords } from '~/api'

function filter(input: string) {
  // 获取输入框的内容inputContent

  // 正则表达式
  // \d 匹配数字

  let flag = false

  for (var i = 0; i < hhhWords.length; i++) {
    // 创建一个正则表达式
    var r = new RegExp(hhhWords[i], 'ig')

    if (r.test(input)) {
      flag = true
    }
  }
  return flag
}

export default filter
