// Configuration for your app

module.exports = function (ctx) {
  return {
    boot: [
      'axios',
      'boot',
      'vuelidate'
    ],
    css: [
      ctx.mode.spa ? 'app.styl' : null, // 指向/src/css/app.styl
      ctx.mode.cordova ? 'app-cordova.styl' : null // 指向/src/css/app-cordova.styl
    ],
    extras: [
      'material-icons', // at least for QEditor if "ios" theme
      ctx.theme ? 'ionicons-v4' : null
    ],
    animations: 'all',
    supportIE: false,
    build: {
      vueRouterMode: 'hash',
      // analyze: true,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          exclude: /(node_modules|quasar)/
        })
      }
    },
    devServer: {
      open: true,
      // host: '192.168.1.254',
      port: ctx.mode.spa ? 9000 : (ctx.mode.pwa ? 9010 : 9020),
      proxy: {
        // 将所有以/api开头的请求代理到jsonplaceholder
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        },
        '/pic': {
          target: 'http://localhost:8083',
          changeOrigin: true,
          pathRewrite: {
            '^/pic': ''
          }
        }
      }
    },
    framework: {
      all: true,
      lang: 'zh-hans'
      // iconSet: ctx.theme ? 'material-icons' : 'ionicons-v4'
    },
    ssr: {
      pwa: false
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        name: 'Quasar Play',
        short_name: 'Quasar-Play',
        description: 'Quasar Framework demo',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    }
  }
}
