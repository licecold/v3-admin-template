import { asyncRoutes, constantRoutes } from '@/router'
import { getAccessRoute } from '@/api/user'
const { VUE_APP_LOCAL } = process.env

/**
 * 权限判断 针对注册路由的路由名称判断(路由匹配*的除外)
 * @param {*} route
 * @param {*} permissionRoutes
 */
function hasPermission(route, permissionRoutes, role) {
  const { name, path } = route
  return path === '*' || permissionRoutes.map(v => v.code).includes(name)
  // return (
  //   path === "*" ||
  //   permissionRoutes.map(v => v.name).includes(name) ||
  //   meta.roles.includes(role)
  // );
}

/**
 * 筛选有权限的路由
 * @param {*} routes
 * @param {*} permissionRoutes
 */
function generateRoutesByPermissionRoutes(routes, permissionRoutes, role) {
  const res = []
  const asides = []
  routes.forEach(route => {
    if (hasPermission(route, permissionRoutes, role)) {
      const temp = Object.assign({}, route)
      Reflect.deleteProperty(temp, 'children')
      if (route.children && route.children.length) {
        const { res: children } = generateRoutesByPermissionRoutes(
          route.children,
          permissionRoutes,
          role
        )
        temp.children = children
      }
      if (temp?.children?.length === 1) {
        temp.redirect = temp.children[0].path
      }
      res.push(temp)

      asides.push(temp)
    }
  })
  return {
    res,
    asides
  }
}

/**
 * 筛选权限路由
 * @param {*} routes 代注册的路由集
 * @param {*} permissionRoutes 当前可用的路由列表
 */
export function filterAsyncRoutes(routes, permissionRoutes, role) {
  const { res: accessedRoutes, asides } = generateRoutesByPermissionRoutes(
    routes,
    permissionRoutes,
    role
  )
  accessedRoutes.unshift({
    path: '/',
    redirect: accessedRoutes[0].name
  })
  return {
    accessedRoutes,
    asides
  }
}

const state = {
  routes: [],
  addRoutes: [],
  loadPermission: false
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = [
      ...constantRoutes.slice(0, 3),
      ...routes,
      ...constantRoutes.slice(-1)
    ]
  },
  SET_ASIDES: (state, asides) => {
    state.asides = asides
  },
  SET_PERMISSION_STATUS: (state, status) => {
    state.loadPermission = status
  },
  RESET_STATE: state => {
    // state = {
    //   routes: [],
    //   addRoutes: [],
    //   loadPermission: false
    // }
    state.routes = []
    state.addRoutes = []
    state.loadPermission = false
  }
}

const actions = {
  generateRoutes({ commit }, { permissionRoutes, role }) {
    return new Promise(resolve => {})
  },
  getUserPermission({ commit, state }, usePermission) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async(resolve, reject) => {
      let accessedRoutes
      let asides
      if (VUE_APP_LOCAL || !usePermission) {
        asides = asyncRoutes.map(v => Object.assign({}, v))
        accessedRoutes = asyncRoutes.map(v => Object.assign({}, v))
        // debugger
        accessedRoutes.unshift({
          path: '/',
          redirect: accessedRoutes[0].name
        })
      } else {
        const { content: permissionRoutes } = await getAccessRoute()
        const permissionResult = filterAsyncRoutes(
          asyncRoutes,
          permissionRoutes
        )
        asides = permissionResult.asides
        accessedRoutes = permissionResult.accessedRoutes
      }
      // asides.pop()
      commit('SET_ASIDES', asides)
      commit('SET_ROUTES', accessedRoutes)
      commit('SET_PERMISSION_STATUS', true)
      resolve(accessedRoutes)
      // asyncRoutes
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
