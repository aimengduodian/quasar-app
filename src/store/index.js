import Vue from 'vue'
import Vuex from 'vuex'

import layoutDemo from './layoutDemo'
import ebook from './ebook'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      layoutDemo,
      ebook
    }
  })

  if (process.env.DEV && module.hot) {
    module.hot.accept(['./layoutDemo'], () => {
      const newLayoutDemo = require('./layoutDemo').default
      Store.hotUpdate({ modules: { layoutDemo: newLayoutDemo } })
    })
    module.hot.accept(['./ebook'], () => {
      const newEbook = require('./ebook').default
      Store.hotUpdate({ modules: { ebook: newEbook } })
    })
  }

  return Store
}
