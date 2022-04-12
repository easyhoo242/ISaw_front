import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 处理请求错误
    return Promise.reject(error)
  }
)

// 相应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default request
