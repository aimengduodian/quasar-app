import categories from 'assets/ebook'
import Layout from 'layouts/ebookweb'

// 懒加载函数
function lazyLoad (path, meta) {
  return {
    path,
    meta,
    component: () => import('pages/ebook/' + path)
  }
}

const about = {
  path: '/about',
  component: Layout,
  children: []
}

categories.forEach(category => {
  category.features.forEach(feature => {
    let path = category.hash + '/' + feature.hash
    about.children.push(lazyLoad(path, feature))
  })
})

export default about
