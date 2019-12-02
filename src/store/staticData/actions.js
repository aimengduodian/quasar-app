// 发包请求数据
export const updateStaticCache = async ({commit}, rPayload) => {
  const {
    bookType = [],
    electronicsType = []
  } = (rPayload || {})

  commit('cacheSet', {
    bookType,
    electronicsType
  })
}
