import home from './router/about'
import market from './router/market'

// 定义路由
const routes = [
  {
    path: '/',
    component: () => import('pages/landing')
  }
]

// home
const homePage = {
  path: '/ebook',
  meta: {
    title: '校园易市',
    icon: 'layers',
    backRoute: '/'
  },
  component: () => import('pages/about/index')
}
// add router
routes.push(homePage)
routes.push(home)
routes.push(market)

// 没有找到路由返回404
routes.push({path: '*', component: () => import('pages/error404.vue')})

export default routes
