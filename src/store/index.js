import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      auth
    }
  })

  if (process.env.DEV && module.hot) {
    module.hot.accept(['./auth'], () => {
      const auth = required('./auth').default
      Store.hotUpdate({ modules: {auth: auth} })
    })
  }

  return Store
}
