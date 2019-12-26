
// 设置当前模式 0.我要购买 1.我要发布
export const updateFlag = ({commit}, val) => {
  // 发包请求数据
  commit('setFlag', val)
}

// change user
export const updateUser = ({commit}, val) => {
  commit('setUser', val)
}

// 存储页面详情信息，用于修改
export const updatePageMsg = ({commit}, val) => {
  const pageMsg = JSON.stringify(val)
  commit('setPageMsg', pageMsg)
}

// 更新用户缓存
export const updateUserCache = async ({commit}, rPayload) => {
  const {
    userDetail = {}
  } = (rPayload || {})

  commit('userDetailCacheSet', {
    userDetail
  })
}

// 更新布局是否显示页眉页脚
export const updateLayoutMsg = async ({commit}, val) => {
  commit('setLayoutMsg', val)
}
