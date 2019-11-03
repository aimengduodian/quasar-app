import categories from 'assets/market'
import Layout from 'layouts/marketLayout'

// 懒加载函数
function lazyLoad (path, name, meta) {
  return {
    path,
    name,
    meta,
    component: () => import('pages/ebook/' + path)
  }
}

const market = {
  path: '/ebook/market',
  component: Layout,
  children: []
}

categories.forEach(category => {
  category.features.forEach(feature => {
    let path = category.hash + '/' + feature.hash
    let name = category.name
    market.children.push(lazyLoad(path, name, feature))
  })
})

export default market
