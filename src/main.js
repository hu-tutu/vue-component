import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import '@/filter'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.config.axios = axios

global.Base64 = require('js-base64').Base64

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
