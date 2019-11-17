<template>
  <q-layout view="lHh LpR lFf">
    <!--reveal滚动隐藏页眉页脚-->
    <q-layout-header reveal>
      <q-toolbar :inverted="$q.theme === 'ios'">
        <q-toolbar-title>
          {{ title }}
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      title: '校园易市'
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
