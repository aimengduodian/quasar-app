// 设置进入系统模式 0.我要购买 1.我要发布
export const setFlag = (state, val) => {
  state.flag = val
}

export const setUser = (state, val) => {
  state.user = val
}

export const setPageMsg = (state, val) => {
  state.pageMsg = val
}

// 设置用户detail信息缓存
export const userDetailCacheSet = (state, rPayload) => {
  // 载荷
  const {
    userDetail = {}
  } = (rPayload || {})

  // 缓存
  sessionStorage.setItem('userDetail', JSON.stringify(userDetail))

  // change
  state.userDetail = userDetail
  try {
    state.user.id = userDetail.id
    state.user.buildingNum = userDetail.buildingNum
    state.user.bossNumber = userDetail.buildingNumber
  } catch (e) {
    console.log(e)
  }

}

// 设置页眉页脚是否显示
export const setLayoutMsg = (state, val) => {
  state.layout = val
}

// 设置页眉页脚是否显示
export const setSearchParams = (state, val) => {
  state.searchParams = val
}
