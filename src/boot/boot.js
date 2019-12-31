// import something here
import gallery from 'img-vuer'

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  Vue.use(gallery, {
    swipeThreshold: 150, // 滑动阈值，默认值 100
    isIndexShow: true, // 是否显示图片序号
    useCloseButton: true, // 只通过右上角关闭键退出浏览
    preload: true // 预加载同组图片
  })
  console.log('start')
}
