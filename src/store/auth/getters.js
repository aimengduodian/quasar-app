import config from 'src/common/config'

export const needVerify = state => {
  let needVerify = true
  if (Number(state.flag) === 1) {
    //  我要发布
    if (state.user.id && Number(state.user.flag) === 1) {
      needVerify = false
    }
  } else if (Number(state.flag) === 0) {
    //  我要购买
    if (state.user.id && Number(state.user.flag) === 0) {
      needVerify = false
    }
  } else {

  }
  return needVerify
}

export const getFlag = state => {
  return state.flag
}

export const getUserMsg = state => {
  return state.user
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

// 获取搜索参数配置信息
export const getSearchParamsMsg = (state) => {
  const searchParams = JSON.parse(JSON.stringify(state.searchParams))
  searchParams.pageNumber = 1
  searchParams.pageSize = config.pageSize

  return searchParams
}
