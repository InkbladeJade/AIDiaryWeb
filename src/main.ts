import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router' // 关键：挂载路由到Vue根实例
// ‌作用‌：使整个应用能够访问$router（路由实例）和$route（当前路由信息）。
const app = createApp(App)

app.use(createPinia())
app.use(router) // 启用路由

app.mount('#app')
