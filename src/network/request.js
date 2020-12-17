import axios from 'axios'
import Vue from 'vue'
import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'


axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'


// 包装请求头 显示ngress
axios.interceptors.request.use(config => {
  NProgress.start();
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config //要返回
})

// 隐藏ngres
axios.interceptors.response.use(config => {
  NProgress.done();
  return config
})








Vue.prototype.$http = axios
