// 注册全局的过滤器  {{ msg | dateFilter }}
import Vue from 'vue'
import moment from 'moment'

// 展示日期格式: YYYY-MM-DD
Vue.filter('dateFilter', function (dataStr, pattern = 'YYYY-MM-DD') {
  if (dataStr) {
    return moment(dataStr).format(pattern)
  } else {
    return dataStr
  }
})

// 展示日期格式: YYYY-MM-DD HH:mm:ss
Vue.filter('timeFilter', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  if (dataStr) {
    return moment(dataStr).format(pattern)
  } else {
    return dataStr
  }
})