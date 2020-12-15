import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入element ui
import './plugins/element.js'

// 引入样式
import 'assets/css/global.css'

// 导入字体图标
import 'assets/fonts/iconfont.css'
// 导入axios
import './network/request.js'



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
