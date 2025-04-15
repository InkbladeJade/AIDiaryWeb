import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from 'vue-router'
import HomeView from '../views/HomeView.vue'

// 定义路由meta信息类型扩展
declare module 'vue-router' {
  interface RouteMeta {
    // requiresAuth: boolean
    aiAnalysis?: boolean // 标记需要AI分析的页面
    transitionName?: string // 页面过渡动画
  }
}

// 配置路由表
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '日记 - 首页',
      // requiresAuth: true,
      transitionName: 'fade',
    },
  },
  {
    path: '/edit/:id?',
    name: 'Edit',
    component: () => import('@/views/Edit.vue'),
    // component: () => import('../views/Edit.vue'),
    props: (route) => ({
      id: route.params.id,
      aiMode: route.query.ai_mode === 'true',
    }),
    meta: {
      title: 'AI日记 - 编辑',
      aiAnalysis: true,
      transitionName: 'slide-left',
    },
  },
  {
    path: '/DiaryList/:id?',
    name: 'DiaryList',
    component: () => import('@/views/DiaryList.vue'),
    props: (router) => ({
      id: router.params.id,
    }),
  },
  // {
  //   path: '/:pathMatch(.*)*',  // 404捕获
  //   name: 'NotFound',
  //   component: () => import('@/views/404.vue')
  // }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  },
})

// 4. 全局导航守卫
router.beforeEach(
  async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    // 案例1：页面标题设置
    if (to.meta.title) {
      document.title = to.meta.title as string
    }

    // // 案例2：登录校验
    // if (to.meta.requiresAuth) {
    //   const isAuthenticated = localStorage.getItem('token')
    //   if (!isAuthenticated) {
    //     next({ name: 'Home', query: { redirect: to.fullPath } })
    //     return
    //   }
    // }

    // // 案例3：AI功能预加载
    // if (to.meta.aiAnalysis) {
    //   try {
    //     await loadAIModel() // 预加载AI模型
    //   } catch (error) {
    //     console.error('AI模型加载失败:', error)
    //     next('/maintenance') // 跳转到维护页面
    //     return
    //   }
    // }

    next()
  },
)

// 示例AI加载函数
const loadAIModel = async () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 500) // 模拟异步加载
  })
}
export default router
