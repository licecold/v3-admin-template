import { createApp } from 'vue'
import App from './App'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import 'normalize.css/normalize.css'
import '@/styles/index.scss' // global css

import store from './store'
import router from './router'

const app = createApp(App)

import SvgIcon from '@/icons' // icon
import '@/permission' // permission control

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

app.component(SvgIcon)

app.use(ElementPlus, { size: 'medium' })

app.use(router)
app.use(store)

app.mount('#app')