<template>
  <q-layout view="lHh LpR lFf">
    <q-layout-header v-model="header" :reveal="headerReveal">
      <q-toolbar :inverted="$q.theme === 'ios'">
        <q-toolbar-title>
          Header
          <span slot="subtitle">Header Subtitle</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-footer v-model="footer" :reveal="footerReveal">
      <demo-tabs/>
    </q-layout-footer>

    <q-page-container>
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in">
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import DemoTabs from 'components/demo-tabs'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    DemoTabs
  },
  computed: {
    header: {
      get () { return this.$store.state.layoutDemo.header },
      set (val) { this.$store.commit('layoutDemo/setHeader', val) }
    },
    footer: {
      get () { return this.$store.state.layoutDemo.footer },
      set (val) { this.$store.commit('layoutDemo/setFooter', val) }
    },
    ...mapGetters('layoutDemo', ['view']),
    ...mapState('layoutDemo', [
      'headerReveal', 'footerReveal',
      'leftOverlay', 'leftBehavior', 'leftBreakpoint',
      'rightOverlay', 'rightBehavior', 'rightBreakpoint',
      'scrolling'
    ])
  }
}
</script>
