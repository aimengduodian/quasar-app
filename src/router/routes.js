// 定义路由
const routes = [
  { path: '/', component: () => import('pages/landing') },
  { path: '/about', name: 'about', component: () => import('pages/about/index') },
  { path: '/version', name: 'version', component: () => import('pages/about/version') },
  { path: '/advice', name: 'advice', component: () => import('pages/about/advice') },
  { path: '/verify', name: 'verify', component: () => import('components/stu') },
  {
    path: '/market',
    component: () => import('layouts/marketLayout'),
    children: [
      {path: 'books/books', name: 'books', component: () => import('pages/ebook/books/books')},
      {path: 'books/view', name: 'books_view', component: () => import('pages/ebook/books/view')},
      {path: 'books/add', name: 'books_add', component: () => import('pages/ebook/books/add')},
      {path: 'coach/coach', name: 'coach', component: () => import('pages/ebook/coach/coach')},
      {path: 'coach/view', name: 'coach_view', component: () => import('pages/ebook/coach/view')},
      {path: 'coach/add', name: 'coach_add', component: () => import('pages/ebook/coach/add')},
      {path: 'electronics/electronics', name: 'electronics', component: () => import('pages/ebook/electronics/electronics')},
      {path: 'electronics/view', name: 'electronics_view', component: () => import('pages/ebook/electronics/view')},
      {path: 'electronics/add', name: 'electronics_add', component: () => import('pages/ebook/electronics/add')},
      {path: 'others/others', name: 'others', component: () => import('pages/ebook/others/others')},
      {path: 'others/view', name: 'others_view', component: () => import('pages/ebook/others/view')},
      {path: 'others/add', name: 'others_add', component: () => import('pages/ebook/others/add')},
      {path: 'person/person', name: 'person', component: () => import('pages/ebook/person/person')},
    ]
  },
  {
    // 没有找到路由返回404
    path: '*',
    component: () => import('pages/error404.vue')
  }
]

export default routes
