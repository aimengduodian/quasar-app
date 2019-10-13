import Vue from 'vue'
import Vuex from 'vuex'

import showcase from './showcase'
import layoutDemo from './layoutDemo'
import ebook from './ebook'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      showcase,
      layoutDemo,
      ebook
    }
  })

  if (process.env.DEV && module.hot) {
    module.hot.accept(['./showcase'], () => {
      const newShowcase = require('./showcase').default
      Store.hotUpdate({ modules: { showcase: newShowcase } })
    })
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
