import Vue from 'vue'
import Vuex from 'vuex'

import ebook from './ebook'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      ebook
    }
  })

  if (process.env.DEV && module.hot) {
    module.hot.accept(['./ebook'], () => {
      const newEbook = require('./ebook').default
      Store.hotUpdate({ modules: { ebook: newEbook } })
    })
  }

  return Store
}
