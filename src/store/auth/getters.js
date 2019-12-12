
export const powerFlag = state => {
  return !(parseInt(state.user.flag) === 0)
}

export const power = state => {
  return state.user.id.length > 1
}

export const getFlag = state => {
  return state.flag
}

export const getPageMsg = state => {
  return state.pageMsg
}

// 获取用户详细信息
export const getUserDetailMsg = (state) => {
  return state.userDetailMsg
}
