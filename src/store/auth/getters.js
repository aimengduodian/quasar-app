
export const powerFlag = (state) => {
  return !(parseInt(state.user.flag) === 0)
}

export const power = (state) => {
  return format.toStr(state.user.id).length > 1
}

export const getFlag = (state) => {
  return state.flag
}

export const getUser = (state) => {
  return state.user
}

export const getUserId = (state) => {
  return state.user.id
}
