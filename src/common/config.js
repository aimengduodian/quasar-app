// 版本号
const version = '0.0.1'

// 服务器地址
// const baseUrl = 'http://47.106.222.50:8080/ebooks/'
const baseUrl = 'https://96ce0aa2.ngrok.io'
const picUrl = 'http://47.106.222.50:8083'
const timeout = 60000

// 每次请求列表加载的条数
const pageSize = 10
//
const reRequestBaseInterval = 60000
const reRequestAddInterval = 10000

export default {
  version,
  baseUrl,
  picUrl,
  timeout,
  pageSize,
  reRequestBaseInterval,
  reRequestAddInterval
}
