import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import staticData from './staticData'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      auth,
      staticData
    }
  })

  if (process.env.DEV && module.hot) {
    module.hot.accept(['./auth'], () => {
      const newAuth = require('./auth').default
      Store.hotUpdate({ modules: {auth: newAuth} })
    })
    module.hot.accept(['./staticData'], () => {
      const newStatic = require('./staticData').default
      Store.hotUpdate({ modules: {staticData: newStatic} })
    })
  }

  return Store
}
