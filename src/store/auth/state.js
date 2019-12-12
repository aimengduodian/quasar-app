export default {
  // 用户信息
  flag: 0,
  user: {
    id: '123',
    flag: 0
  },
  // 图书电子辅导其他的页面信息
  // 用于从详情页到编辑页面
  pageMsg: '',
  // 用户详细信息，放入缓存中
  userDetailMsg: JSON.parse(sessionStorage.getItem('userDetail')) || {}
}
