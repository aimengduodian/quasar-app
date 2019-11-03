import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

export default function ({ store }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,
    // Leave these as is and change
    // from quasar.conf.js instead!
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  // 前置路由守卫
  Router.beforeEach((to, from, next) => {
    if (to.meta) {
      switch (to.meta.hash) {
        case '/ebook':
          store.commit('ebook/updatePageMeta', to.meta)
          break
      }
    }

    next()
  })

  return Router
}
