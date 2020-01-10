// 定义路由
const routes = [
  {
    path: '/', component: () => import('pages/landing'),
    meta: { keepAlive: false }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('pages/about/index'),
    meta: { keepAlive: false }
  },
  {
    path: '/version',
    name: 'version',
    component: () => import('pages/about/version'),
    meta: { keepAlive: true }
  },
  {
    path: '/advice',
    name: 'advice',
    component: () => import('pages/about/advice'),
    meta: { keepAlive: false }
  },
  {
    path: '/verify',
    name: 'verify',
    component: () => import('components/stu'),
    meta: { keepAlive: false }
  },
  {
    path: '/buildingSelect',
    name: 'buildingSelect',
    component: () => import('components/buildingSelect'),
    meta: { keepAlive: false }
  },
  {
    path: '/market',
    component: () => import('layouts/marketLayout'),
    meta: { keepAlive: false },
    children: [
      {
        path: 'books/books',
        name: 'books',
        component: () => import('pages/ebook/books/books'),
        meta: { keepAlive: true }
      },
      {
        path: 'books/view',
        name: 'books_view',
        component: () => import('pages/ebook/books/view'),
        meta: { keepAlive: false }
      },
      {
        path: 'books/add',
        name: 'books_add',
        component: () => import('pages/ebook/books/add'),
        meta: { keepAlive: false }
      },
      {
        path: 'coach/coach',
        name: 'coach',
        component: () => import('pages/ebook/coach/coach'),
        meta: { keepAlive: true }
      },
      {
        path: 'coach/view',
        name: 'coach_view',
        component: () => import('pages/ebook/coach/view'),
        meta: { keepAlive: false }
      },
      {
        path: 'coach/add',
        name: 'coach_add',
        component: () => import('pages/ebook/coach/add'),
        meta: { keepAlive: false }
      },
      {
        path: 'electronics/electronics',
        name: 'electronics',
        component: () => import('pages/ebook/electronics/electronics'),
        meta: { keepAlive: true }
      },
      {
        path: 'electronics/view',
        name: 'electronics_view',
        component: () => import('pages/ebook/electronics/view'),
        meta: { keepAlive: false }
      },
      {
        path: 'electronics/add',
        name: 'electronics_add',
        component: () => import('pages/ebook/electronics/add'),
        meta: { keepAlive: false }
      },
      {
        path: 'others/others',
        name: 'others',
        component: () => import('pages/ebook/others/others'),
        meta: { keepAlive: true }
      },
      {
        path: 'others/view',
        name: 'others_view',
        component: () => import('pages/ebook/others/view'),
        meta: { keepAlive: false }
      },
      {
        path: 'others/add',
        name: 'others_add',
        component: () => import('pages/ebook/others/add'),
        meta: { keepAlive: false }
      },
      {
        path: 'person/person',
        name: 'person',
        component: () => import('pages/ebook/person/person'),
        meta: { keepAlive: true }
      }
    ]
  },
  {
    path: '/shop',
    component: () => import('layouts/shopLayout'),
    meta: { keepAlive: false },
    children: [
      {
        path: 'shop/list',
        name: 'shopList',
        component: () => import('pages/shop/shopList'),
        meta: { keepAlive: true }
      },
      {
        path: 'shop/view',
        name: 'shop_view',
        component: () => import('pages/shop/shopGoodsList'),
        meta: { keepAlive: false }
      },
      {
        path: 'shop/orderList',
        name: 'orderList',
        component: () => import('pages/shop/shopList'),
        meta: { keepAlive: false }
      },
      {
        path: 'shop/shopPerson',
        name: 'shopPerson',
        component: () => import('pages/shop/shopList'),
        meta: { keepAlive: false }
      }
    ]
  },
  {
    // 没有找到路由返回404
    path: '*',
    component: () => import('pages/error404.vue'),
    meta: { keepAlive: false }
  }
]

export default routes
