import { hhhWords } from '~/api'

function filter(input: string) {
  let flag = false

  for (var i = 0; i < hhhWords.length; i++) {
    var r = new RegExp(hhhWords[i], 'ig')

    if (r.test(input)) {
      flag = true
    }
  }
  return flag
}

export default filter
