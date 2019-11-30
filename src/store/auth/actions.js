
// 设置当前模式 0.我要购买 1.我要发布
export const updateFlag = ({commit}, val) => {
  // 发包请求数据
  commit('setFlag', val)
}

// change user
export const updateUser = ({commit}, val) => {
  commit('setUser', val)
}

//
export const updatePageMsg = ({commit}, val) => {
  const pageMsg = JSON.stringify(val)
  commit('setPageMsg', pageMsg)
}
