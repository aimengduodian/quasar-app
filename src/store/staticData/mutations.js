
export const cacheSet = (state, rPayload) => {
  // 载荷
  const {
    bookType = [],
    electronicsType = [],
    reportType = []
  } = (rPayload || {})

  // 缓存
  sessionStorage.setItem('bookType', JSON.stringify(bookType))
  sessionStorage.setItem('electronicsType', JSON.stringify(electronicsType))
  sessionStorage.setItem('reportType', JSON.stringify(reportType))

  // change
  state.bookCached = bookType
  state.electronicsCached = electronicsType
  state.reportCached = reportType
}
