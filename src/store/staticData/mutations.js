
export const cacheSet = (state, rPayload) => {
  // 载荷
  const {
    bookType = [],
    electronicsType = []
  } = (rPayload || {})

  // 缓存
  sessionStorage.setItem('bookType', JSON.stringify(bookType))
  sessionStorage.setItem('electronicsType', JSON.stringify(electronicsType))

  // change
  state.bookCached = bookType
  state.electronicsCached = electronicsType
}
