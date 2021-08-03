import Cookies from 'js-cookie'

const TokenKey = 'token'
const UserIdKey = 'userId'

export function getToken() {
  return Cookies.get(TokenKey)
}
export function getUserId() {
  return Cookies.get(UserIdKey)
}

export function setToken(token, options) {
  return Cookies.set(TokenKey, token, options)
}

export function setUserId(token, options) {
  return Cookies.set(UserIdKey, token, options)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function clear() {
  Cookies.remove(TokenKey)
  Cookies.remove(UserIdKey)
}
