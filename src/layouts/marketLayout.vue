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
    ...mapActions('staticData', ['updateStaticCache']),
    ...mapActions('auth', ['updateUserCache']),
    show () {
      this.layoutModal = true
    },
    selected (item) {
      this.$q.notify(`Selected suggestion "${item.label}"`)
    },
    async init () {
      const bookType = await this.$axios.get('/booktype/booktypes').then(res => {
        return res.data.page.booktypes
      })
      const electronicsType = await this.$axios.get('/electronicstype/electronicsTypes').then(res => {
        return res.data.page.electronicsType
      })
      await this.updateStaticCache({bookType, electronicsType})
    }
  },
  created () {
    // this.$q['fullscreen'].toggle()
    this.init()
  }
}
</script>
