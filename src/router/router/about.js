import Layout from 'layouts/ebookweb'

const about = {
  path: '/about',
  component: Layout,
  children: [
    {path: 'index', name: 'about', component: () => import('pages/about/index')},
    {path: 'version', name: 'version', component: () => import('pages/about/version')},
    {path: 'advice', name: 'advice', component: () => import('pages/about/advice')},
    {path: 'verify', name: 'verify', component: () => import('components/stu')}
  ]
}

export default about
