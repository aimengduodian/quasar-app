// import something here

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // 在这里写一些逻辑...

  // ...然后，启动我们的Quasar网站/应用程序：

  /* eslint-disable-next-line no-new */
  new Vue(app)
  console.log('start')
  // “应用程序”具有Quasar CLI熟悉的所有功能，
  // 在这一点上你不需要注入任何东西
}
