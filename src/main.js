import Vue from 'vue'
import App from './App.vue'
import router from './router'
// ele组件
import { Button, Select } from 'element-ui';
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
