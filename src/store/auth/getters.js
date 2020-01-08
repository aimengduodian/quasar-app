import config from 'src/common/config'

export const powerFlag = state => {
  return !(parseInt(state.user.flag) === 0)
}

export const power = state => {
  return state.user.id.length > 1
}

export const getFlag = state => {
  return state.flag
}

// 获取页面header和footer的布局信息
export const getLayout = state => {
  return state.layout
}

// 获取图书电子辅导其他的页面信息，用于从详情页到编辑页面
export const getPageMsg = state => {
  return state.pageMsg
}

// 获取用户详细信息
export const getUserDetailMsg = (state) => {
  return sessionStorage.getItem('userDetail')
}

// 获取用户详细信息
export const getSearchParamsMsg = (state) => {
  const searchParams = JSON.parse(JSON.stringify(state.searchParams))
  searchParams.pageNumber = 1
  searchParams.pageSize = config.pageSize

  return searchParams
}
