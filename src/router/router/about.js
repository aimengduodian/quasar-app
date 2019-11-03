import categories from 'assets/ebook'
import Layout from 'layouts/ebookweb'

// 懒加载函数
function lazyLoad (path, name, meta) {
  return {
    path,
    name,
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
    let name = category.name
    about.children.push(lazyLoad(path, name, feature))
  })
})

export default about
