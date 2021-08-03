import { useStore } from 'vuex'
import axios from 'axios'
import { ElNotification, ElMessageBox } from 'element-plus'
import store from '@/store'
import { getToken } from '@/utils/auth'
import statusConf from '@/config/request.conf'

// create an axios instance
const service = axios.create({
  baseURL:
    process.env.VUE_APP_ENV === 'development'
      ? ''
      : process.env.VUE_APP_BASE_API,
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' },
  timeout: 0
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.token = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

function handleAccessDenied(status, statusKey) {
  const { errorMap: err } = statusConf
  const errMap = err[statusKey]
  if (Object.keys(errMap).includes(Number(status))) {
    ElMessageBox.confirm(
      errMap[Number(status)],
      {
        confirmButtonText: '重新登陆',
        type: 'warning'
      }
    ).then(() => {
      store.dispatch('user/logout')
    })
  }
}

function validateRes(res) {
  // 有效状态码key值
  const codeKey = ['code', 'status']
  const _key = codeKey.find(key => Reflect.has(res, key))

  if (!_key) return Promise.reject(new Error('Error Illegal Response'))

  const { successMap: succ, errorMap: err } = statusConf
  const succMap = succ[_key]
  if (!succMap.includes(res[_key])) {
    ElNotification({
      title: '错误',
      message: res.msg || res.message || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    setTimeout(() => {
      handleAccessDenied(res[_key], _key)
    }, 500)
    return Promise.reject(new Error(res.message || 'Error'))
  } else {
    return res
  }
}

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.request.responseType === 'arraybuffer') {
      const blob = new Blob([response.data], {
        type: response.headers['content-type']
      })
      const link = document.createElement('a')
      const fileName = response.config.fileName
        ? response.config.fileName + '.xlsx'
        : `${new Date().valueOf()}.xlsx`
      link.href = window.URL.createObjectURL(blob)
      link.download = decodeURIComponent(fileName)
      link.click()
      return
    }
    const res = response.data
    return validateRes(res)
  },
  error => {
    console.log('err' + error) // for debug
    ElNotification({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
