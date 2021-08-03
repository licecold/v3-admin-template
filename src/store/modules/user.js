import { getUserInfo, login, logout } from '@/api/user'
import { setToken, setUserId, getToken, clear } from '@/utils/auth'
import { resetRouter } from '@/router'
import store from '../index'

const getDefaultState = () => {
  return {
    token: getToken(),
    userId: '',
    name: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { account, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ account: account.trim(), password: password })
        .then(response => {
          const { content } = response
          const { token, expire } = content
          commit('SET_TOKEN', token)
          setToken(token, { expires: expire / 3600 })
          // setUserId(userId, { expires: expire / 3600 })
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo()
        .then(response => {
          const { content } = response
          const { name, realName, idStr } = content
          setUserId(idStr)
          const n = name || realName
          commit('SET_NAME', n)
          resolve(content)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      clear()
      commit('RESET_STATE')
      store.commit('permission/RESET_STATE')
      resetRouter()
      // router.replace('/login')
      location.href = '/#/login'
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      clear()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
