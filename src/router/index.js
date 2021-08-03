import { createRouter, createWebHashHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import ErrorComponent from '@/components/ErrorComponent'
import LoadingComponent from '@/components/LoadingComponent'

/* Layout */
import Layout from '@/layout'

const getComponent = loader =>
  defineAsyncComponent({
    loader: loader,
    // delay: 200,
    // timeout: 3000,
    errorComponent: ErrorComponent,
    loadingComponent: LoadingComponent
  })

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: getComponent(() => import('@/views/login/index.vue')),
    hidden: true
  },

  {
    path: '/404',
    component: getComponent(() => import('@/views/404')),
    hidden: true
  },

  // 404 page must be placed at the end !!!
  { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true }
]

export const asyncRoutes = [
  {
    path: '/dashboard',
    component: Layout,
    name: 'Dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: getComponent(() => import('@/views/dashboard/index')),
        meta: { title: 'Dashboard', icon: 'dashboard' }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: getComponent(() => import('@/views/table/index')),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: getComponent(() => import('@/views/tree/index')),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: getComponent(() => import('@/views/form/index')),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

export default router
