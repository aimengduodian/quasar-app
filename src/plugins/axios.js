// import something here
import axios from 'axios'
import cookie from 'vue-cookie'
import qs from 'qs'

// axios默认配置
axios.defaults.baseURL = 'http://47.106.222.50:8080'
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    // 判断是否存在ticket，如果存在的话，则每个http header都加上ticket
    if (cookie.get('token')) {
      // 用户每次操作，都将cookie设置成2小时
      cookie.set('token', cookie.get('token'), 1 / 12)
      cookie.set('name', cookie.get('name'), 1 / 12)
      config.headers.token = cookie.get('token')
      config.headers.name = cookie.get('name')
    }
    return config
  },
  error => {
    return Promise.reject(error.response)
  })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.resultCode === '404') {
      console.log('response.data.resultCode是404')
      // 返回 错误代码-1 清除ticket信息并跳转到登录页面
      // cookie.del('ticket')
      // window.location.href='http://login.com'
      console.log(response.data)
    }
    else {
      return response
    }
  },
  error => {
    // 返回接口返回的错误信息
    return Promise.reject(error.response)
  })

export default ({ Vue }) => {
  Vue.prototype.$axios = axios
}
