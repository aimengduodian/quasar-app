// import something here
import axios from 'axios'
import cookie from 'vue-cookie'

// axios默认配置
axios.defaults.timeout = 10000   // 超时时间
// axios.defaults.baseURL = 'http://192.168.2.251'  // 默认地址

// 整理数据
axios.defaults.transformRequest = function (data) {
  data = JSON.stringify(data)
  return data;
}

// http request 拦截器
axios.interceptors.request.use(
    config => {
      config.data = JSON.stringify(config.data)
      config.headers['Content-Type'] = 'application/json;charset=UTF-8';
      //判断是否存在ticket，如果存在的话，则每个http header都加上ticket
      if (cookie.get("token")) {
        //用户每次操作，都将cookie设置成2小时
        cookie.set("token",cookie.get("token") ,1/12)
        cookie.set("name",cookie.get("name") ,1/12)
        config.headers.token = cookie.get("token")
        config.headers.name= cookie.get("name")
      }
      return config
    },
    error => {
      return Promise.reject(error.response);
    })

// http response 拦截器
axios.interceptors.response.use(
    response => {
      if (response.data.resultCode ==="404") {
        console.log("response.data.resultCode是404")
        // 返回 错误代码-1 清除ticket信息并跳转到登录页面
        //      cookie.del("ticket")
        //      window.location.href='http://login.com'
        return
      }else{
        return response;
      }
    },
    error => {
      return Promise.reject(error.response)   // 返回接口返回的错误信息
    })

export default ({ Vue }) => {
  Vue.prototype.$axios = axios
}
