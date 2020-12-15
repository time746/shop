import axios from 'axios'
import Vue from 'vue'

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'


// 包装请求头
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config //要返回
})









Vue.prototype.$http = axios
