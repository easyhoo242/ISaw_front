function filter(input: string) {
  // 获取输入框的内容inputContent

  // 多个敏感词，这里直接以数组的形式展示出来
  var arrMg = ['fuck', 'tmd', '他妈的']

  // 正则表达式
  // \d 匹配数字

  let flag = false

  for (var i = 0; i < arrMg.length; i++) {
    // 创建一个正则表达式
    var r = new RegExp(arrMg[i], 'ig')

    if (r.test(input)) {
      flag = true
    }
  }
  return flag
}

export default filter
