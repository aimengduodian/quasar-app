/*
 本项目中webpack已经支持以下别名
 以下配置是为让idea识别此配置
  */
const resolve = dir => require('path').join(__dirname, dir)
module.exports = {
  resolve: {
    alias: {
      'quasar': resolve('node_modules/quasar-framework/dist/quasar.<configured-theme>.esm.js'),
      'src': resolve('/src'),
      'components': resolve('/src/components'),
      'layouts': resolve('/src/layouts'),
      'pages': resolve('/src/pages'),
      'assets': resolve('/src/assets'),
      'plugins': resolve('/src/plugins')
    }
  }
}
