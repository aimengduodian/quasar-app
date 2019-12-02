
export default {
  // 全局
  bookCached: JSON.parse(sessionStorage.getItem('bookType')) || [],
  electronicsCached: JSON.parse(sessionStorage.getItem('electronicsType')) || []
}
