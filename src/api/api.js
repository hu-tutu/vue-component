import axios from "axios";
import { Message,Loading } from "element-ui";
// import store from "../../../vuex/store";
// import router from "../../router";
import {getlocal } from "../../utils/utils";
import '../../../env'

var instance = axios.create({
  timeout: 1000 * 60
})
let loading //定义loading变量
//开始 加载loading
let startLoading=()=>{
  loading = Loading.service({
    lock: true,
    text: '系统正在查找，请稍后！',
    background: 'rgba(0, 0, 0, 0.8)'
  })
}
//结束 取消loading加载
let endLoading=()=>{
  loading.close()
}

const defaultHeaders = {
  Accept: 'application/json, text/plain, */*; charset=utf-8',
  'Content-Type': 'application/json; charset=utf-8',
  Pragma: 'no-cache',
  'Cache-Control': 'no-cache',
}

// 设置默认请求头
Object.assign(axios.defaults.headers.common, defaultHeaders)
// console.log(axios.defaults)
// axios.defaults.headers.post['permCode'] = '111'


// 添加请求拦截器

axios.interceptors.request.use(function (config) {
  if (config.url.indexOf('/show')!=-1||config.url.indexOf('/save')!=-1||config.url.indexOf('/update')!=-1||config.url.indexOf('/commit')!=-1) {
    startLoading ()
  }
  let CONSOLE_TOKEN
  if (getlocal('erp_token')) {
    CONSOLE_TOKEN = getlocal('erp_token')
  }else{
    CONSOLE_TOKEN = '';
  }
  config.headers['permCode']='C1ED634230C44D6C889FD4ABFD7999C0',
  config.headers['permTime']=new Date()
  // CONSOLE_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ7XCJhY2NvdW50XCI6XCJ0ZXN0XCIsXCJpZFwiOjEsXCJuYW1lXCI6XCLpgJrnlKjmtYvor5XlkZhcIn0ifQ.NpgYR0VSb6xONv3RL3Zst6KrhihnMIeAhiW64EQiAAM'
  config.headers['token'] = CONSOLE_TOKEN
  // config.headers = {
  //   'token': CONSOLE_TOKEN // 携带权限参数
  // }
  return config
}, function (error) {
  // 对请求错误做些什么
  Message({
    message: error.msg,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})

// 相应拦截
axios.interceptors.response.use(
  response => {
    if (loading!=undefined&&loading!=null) {
      endLoading ()
    }
    const { status } = response.data
    switch (status) {
      case 401:
        Message({
          message: response.data.message,
          type: 'error',
        })
        // MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        //   confirmButtonText: '重新登录',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('LogOut').then(() => {
        //     location.reload() // 为了重新实例化vue-router对象 避免bug
        //   })
        // })
        break;
      case 400:
        console.log(response.data.message)
        break
      case 403:
        Message({
          message: response.data.message,
          type: 'error',
        })
        window.location.href = '/'
        break
      case 404:
        window.location.href = './#/home/fail'
        // console.log('请求错误,未找到该资源')
        break
      case 500:
        console.log(response.data.message)
        break
      case 502:
        // 对 502 错误进行处理
        console.log(response.data.message)
        break
      case 503:
        // 对 503 错误进行处理
        console.log(response.data.message)
        break
      case 504:
        // 对 504 错误进行处理
        Message({
          message: response.data.message,
          type: 'error',
        })
        break
      default:
        return response
    }
  },
  error => {
    Message({
      message: error.msg,
      type: 'error',
      duration: 5 * 1000
    })
    if (loading!=undefined&&loading!=null) {
      endLoading ()
    }
    return Promise.reject(error)
  }
)
export default axios
// export default axios

