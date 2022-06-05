import dayjs from 'dayjs'
import locale_de from 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs().locale(locale_de)
dayjs.extend(relativeTime)

export const useDayjs = dayjs
