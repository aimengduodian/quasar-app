<template>
  <q-layout view="lHh LpR lFf">
    <q-layout-header v-model="header" :reveal="headerReveal">
      <q-toolbar :inverted="$q.theme === 'ios'">
        <q-toolbar-title>
          <q-search inverted color="light" v-model="terms" placeholder="点击搜索">
            <q-autocomplete
              @search="search"
              @selected="selected"
            />
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
import { uid, filter } from 'quasar'
import countries from 'assets/autocomplete.json'
import { mapState, mapGetters } from 'vuex'

const icons = ['alarm', 'email', 'search', 'build', 'card_giftcard', 'perm_identity', 'receipt', 'schedule', 'speaker_phone', 'archive', 'weekend', 'battery_charging_full']

function getRandomIcon () {
  return icons[Math.floor(Math.random() * icons.length)]
}
function getRandomStamp () {
  if (Math.floor(Math.random() * 50) % 3 === 0) {
    return `${Math.floor(Math.random() * 10)} min`
  }
}
function getRandomSecondLabel () {
  if (Math.floor(Math.random() * 50) % 4 === 0) {
    return `UID: ${uid().substring(0, 8)}`
  }
}
function parseCountries () {
  return countries.map(country => {
    return {
      label: country,
      sublabel: getRandomSecondLabel(),
      icon: getRandomIcon(),
      stamp: getRandomStamp(),
      value: country
    }
  })
}

export default {
  components: {
    DemoTabs
  },
  data() {
    return {
      terms: '',
      countries: parseCountries(),
      headerReveal: false,
      footerReveal: false
    }
  },
  methods: {
    search (terms, done) {
      setTimeout(() => {
        done(filter(terms, {field: 'value', list: parseCountries()}))
      }, 1000)
    },
    selected (item) {
      this.$q.notify(`Selected suggestion "${item.label}"`)
    }
  },
  computed: {
    header: {
      get () { return this.$store.state.layoutDemo.header },
      set (val) { this.$store.commit('layoutDemo/setHeader', val) }
    },
    footer: {
      get () { return this.$store.state.layoutDemo.footer },
      set (val) { this.$store.commit('layoutDemo/setFooter', val) }
    }
  }
}
</script>
