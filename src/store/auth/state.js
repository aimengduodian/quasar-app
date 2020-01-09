export default {
  // 权限控制 0.我要购买 1.我要发布
  flag: 0,
  // 用户信息
  user: {
    id: '123',
    // 是否进行学生认证
    flag: 0,
    // 用户所在的寝楼
    buildingNum: 0,
    // 是否为小卖部的店主(判断buildNumber是否为null)
    bossNumber: null,
  },
  // 图书电子辅导其他的页面信息，用于从详情页到编辑页面
  pageMsg: '',
  // 页眉布局信息, 页眉页脚是否显示
  layout: { header: true, footer: true },
  // 搜索参数
  searchParams: {}
}
