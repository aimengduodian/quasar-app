<template>
  <q-layout view="lHh lpr lFf">
    <!--header-->
    <q-header v-model="layout.header" >
      <header-model />
    </q-header>
    <!--footer-->
    <q-footer bordered v-model="layout.footer"
              class="bg-white text-primary">
      <footer-tabs/>
    </q-footer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import HeaderModel from 'components/search-modal'
import FooterTabs from 'components/market-tabs'

export default {
  components: {
    HeaderModel,
    FooterTabs
  },
  data () {
    return {
      layoutModal: false
    }
  },
  computed: {
    ...mapState('auth', ['layout'])
  },
  methods: {
    ...mapActions('auth', ['updateUserCache']),
    show () {
      this.layoutModal = true
    },
    selected (item) {
      this.$q.notify(`Selected suggestion "${item.label}"`)
    }
  }
}
</script>
