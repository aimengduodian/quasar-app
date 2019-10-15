<template>
  <q-layout view="lHh LpR lFf">
    <q-layout-header>
      <q-toolbar :inverted="$q.theme === 'ios'">
        <q-toolbar-title>
          <q-search inverted v-model="terms" placeholder="点击搜索">
            <q-autocomplete />
          </q-search>
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
  data() {
    return {
      terms: '',
      selected: '123',
      footer: true,
      footerReveal: true
    }
  },
  computed: {
    search() {

    }
  }
}
</script>
