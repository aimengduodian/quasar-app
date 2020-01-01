import { fetchGet } from '../../boot/axios.js'
// 发包请求数据
export const updateStaticCache = async ({commit}) => {
  const bookType = await fetchGet('/booktype/booktypes').then(res => {
    if (Number(res.data.code) === 100) {
      return res.data.page.booktypes
    }
  })
  const electronicsType = await fetchGet('/electronicstype/electronicsTypes').then(res => {
    if (Number(res.data.code) === 100) {
      return res.data.page.electronicsType
    }
  })
  // 获取举报类型
  const reportType = await fetchGet ('/reporttype/reporttypeinfo').then((res) => {
    if (Number(res.data.code) === 100) {
     return res.data.page.pageinfo
    }
  })

  commit('cacheSet', {
    bookType,
    electronicsType,
    reportType
  })
}
