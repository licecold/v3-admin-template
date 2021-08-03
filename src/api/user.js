import request from '@/utils/request'
import { getToken } from '@/utils/auth'
const prefix = process.env.VUE_APP_AAA_API

export function login({ account, password }) {
  return request({
    url: prefix + '/login/password/v2',
    method: 'post',
    data: {
      account,
      password
    }
  })
}

export function logout() {
  return request({
    url: prefix + '/logout'
  })
}

export function getUserInfo() {
  return request({
    url: prefix + '/queryUserByToken',
    method: 'post',
    data: {
      token: getToken()
    }
  })
}

export function getAccessRoute() {
  return request({
    url: prefix + '/getPageAuthByUserAndProduct',
    method: 'post',
    data: {
      token: getToken(),
      productId: process.env.VUE_APP_ENV === 'production' ? 're_web' : 're-web'
    }
  })
}
