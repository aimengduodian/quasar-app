<template>
  <q-layout view="lHh LpR lFf">
    <!--reveal滚动隐藏页眉页脚-->
    <q-layout-header reveal>
      <q-toolbar :inverted="$q.theme === 'ios'">
        <q-toolbar-title>
          {{ pageMeta.title }}
        </q-toolbar-title>
      </q-toolbar>
      <ebook-tabs v-if="$q.theme === 'mat'"/>
    </q-layout-header>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import EbookTabs from 'components/ebook-tabs'
import { mapState } from 'vuex'
import categories from 'assets/ebook'

export default {
  components: {
    EbookTabs
  },
  data () {
    return {
      categories
    }
  },
  computed: {
    ...mapState('ebook', [
      'pageMeta'
    ])
  },
  methods: {
    resetScroll (el, done) {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      done()
    }
  },
  created () {
    // this.$q.fullscreen.toggle()
  }
}
</script>
