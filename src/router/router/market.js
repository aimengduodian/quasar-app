import categories from 'assets/market'
import Layout from 'layouts/marketLayout'

// 懒加载函数
function lazyLoad (path, meta) {
  return {
    path,
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
    market.children.push(lazyLoad(path, feature))
  })
})

export default market
