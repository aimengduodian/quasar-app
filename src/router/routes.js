import categories from 'assets/categories' // 类别
import LayoutShowcase from 'layouts/showcase' // 布局展示
// ebook页面
import ebookCategories from 'assets/ebook'
import LayoutEbookWeb from 'layouts/ebookweb'

// 定义路由
const routes = [
  {
    path: '/',
    component: () => import('pages/landing')
  }
]
// 懒加载函数
function lazyLoad (path, meta) {
  return {
    path,
    meta,
    component: () => import('pages/showcase/' + path)
  }
}

const showcase = {
  path: '/showcase',
  component: LayoutShowcase,
  children: [
    {
      path: '',
      meta: {
        title: 'showcase',
        hash: '/showcase',
        icon: 'layers',
        backRoute: '/'
      },
      component: () => import('pages/showcase/index')
    }
  ]
}

categories.forEach(category => {
  if (category.extract) {
    return
  }
  category.features.forEach(feature => {
    let path = category.hash + '/' + feature.hash

    if (!feature.tabs) {
      showcase.children.push(lazyLoad(path, feature))
      return
    }

    feature.tabs.forEach(tab => {
      let subpath = path + '/' + tab.hash
      showcase.children.push(lazyLoad(subpath, {
        title: tab.title,
        hash: '/' + path,
        iframeTabs: feature.iframeTabs,
        icon: feature.icon,
        tabs: feature.tabs
      }))
    })

    routes.push({
      path: '/showcase/' + path,
      redirect: '/showcase/' + path + '/' + feature.tabs[0].hash
    })
  })
})

routes.push(showcase)

// ebook路由
// 懒加载函数
function lazyLoadEbook (path, meta) {
  return {
    path,
    meta,
    component: () => import('pages/ebook/' + path)
  }
}

const ebook = {
  path: '/ebook',
  component: LayoutEbookWeb,
  children: [
    {
      path: '',
      meta: {
        title: '校园易市',
        hash: '/ebook',
        icon: 'layers',
        backRoute: '/'
      },
      component: () => import('pages/ebook/index')
    }
  ]
}

ebookCategories.forEach(category => {
  if (category.extract) {
    return
  }
  category.features.forEach(feature => {
    let path = category.hash + '/' + feature.hash

    if (!feature.tabs) {
      ebook.children.push(lazyLoadEbook(path, feature))
      return
    }

    feature.tabs.forEach(tab => {
      let subpath = path + '/' + tab.hash
      ebook.children.push(lazyLoadEbook(subpath, {
        title: tab.title,
        hash: '/' + path,
        iframeTabs: feature.iframeTabs,
        icon: feature.icon,
        tabs: feature.tabs
      }))
    })

    routes.push({
      path: '/ebook/' + path,
      redirect: '/ebook/' + path + '/' + feature.tabs[0].hash
    })
  })
})

routes.push(ebook)

// ebook路由
routes.push({
  path: '/ebook/market',
  component: () => import('layouts/marketLayout'),
  children: [
    {path: 'books', component: () => import('pages/ebook/books/books')},
    {path: 'electronics', component: () => import('pages/ebook/electronics/electronics')},
    {path: 'others', component: () => import('pages/ebook/others/others')},
    {path: 'coach', component: () => import('pages/ebook/coach/coach')},
    {path: 'view', component: () => import('pages/ebook/books/view')}
  ]
})

// 没有找到路由返回404
routes.push({path: '*', component: () => import('pages/error404.vue')})

export default routes
