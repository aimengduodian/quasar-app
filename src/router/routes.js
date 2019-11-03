import home from './router/about'
import market from './router/market'

// 定义路由
const routes = [
  {
    path: '/',
    component: () => import('pages/landing')
  }
]

// add router
routes.push(home)
routes.push(market)

console.log(routes)

// 没有找到路由返回404
routes.push({path: '*', component: () => import('pages/error404.vue')})

export default routes
