/*
 * 将全部的标签过滤，不过滤标签内内容
 * */
function filterHtml(str: string) {
  // var reg =  /<[^>]+>/gi;  //过滤全部的html标签
  var reg = new RegExp('<[^>]+>', 'gi') //过滤全部的html标签，不包括内容

  // var reg2 = /<(img|br|hr|input)[^>]*>/gi;  //只匹配img、br、hr、input标签
  // var reg2 = new RegExp('<(img|br|hr|input)[^>]*>', 'gi') //只匹配img、br、hr、input标签

  // var reg3 = /<(\S*)[^>]*>[^<]*<\/(\1)>/gi;        //分组匹配，过滤全部的html标签，包括内容
  // var reg3 = new RegExp('<(\\S*)[^>]*>[^<]*<\\/(\\1)>', 'gi') //分组匹配，过滤全部的html标签，包括内容

  if (typeof str != 'string') {
    return str
  }

  return str.replace(reg, '').replace(/&nbsp;/gi, '')
}

export { filterHtml }
