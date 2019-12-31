import { fetchGet } from '../../boot/axios.js'
// 发包请求数据
export const updateStaticCache = async ({commit}) => {
  const bookType = await fetchGet('/booktype/booktypes').then(res => {
    return res.data.page.booktypes
  })
  const electronicsType = await fetchGet('/electronicstype/electronicsTypes').then(res => {
    return res.data.page.electronicsType
  })

  commit('cacheSet', {
    bookType,
    electronicsType
  })
}
