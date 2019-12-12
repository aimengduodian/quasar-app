
export default {
  // 图书类型列表
  bookCached: JSON.parse(sessionStorage.getItem('bookType')) || [],
  // 电子类型列表
  electronicsCached: JSON.parse(sessionStorage.getItem('electronicsType')) || []
}
