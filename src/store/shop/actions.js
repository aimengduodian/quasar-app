import { fetchGet } from '../../boot/axios.js'

// 获取用户信息
export const requestUserMsg = async ({ commit }) => {
  // 更新用户缓存
  commit('userDetailCacheSet', {
    userDetail
  })
}

