// import something here
import gallery from 'img-vuer'

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // 在这里写一些逻辑...

  // ...然后，启动我们的Quasar网站/应用程序：

  /* eslint-disable-next-line no-new */
  new Vue(app)

  Vue.use(gallery, {
    swipeThreshold: 150, // 滑动阈值，默认值 100
    isIndexShow: true, // 是否显示图片序号
    useCloseButton: true, // 只通过右上角关闭键退出浏览
    preload: true // 预加载同组图片
  })

  console.log('start')
  // “应用程序”具有Quasar CLI熟悉的所有功能，
  // 在这一点上你不需要注入任何东西
}
