<template>
  <q-layout view="lHh lpr lFf">
    <!--header-->
    <q-header v-model="getLayout.header" >
      <header-model />
    </q-header>
    <!--footer-->
    <q-footer bordered v-model="getLayout.footer"
              class="bg-white text-primary">
      <footer-tabs/>
    </q-footer>
    <q-page-container>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import HeaderModel from 'components/search-modal'
import FooterTabs from 'components/shop-tabs'

export default {
  components: {
    HeaderModel,
    FooterTabs
  },
  data () {
    return {
      layoutModal: false,
      flag: false
    }
  },
  computed: {
    ...mapGetters('auth', ['getLayout'])
  },
  methods: {
    ...mapActions('auth', ['updateUserCache', 'updateLayoutMsg']),
    show () {
      this.layoutModal = true
    },
    selected (item) {
      this.$q.notify(`Selected suggestion "${item.label}"`)
    }
  },
  watch: {
    '$route.name'(val) {
      console.log(val)
    }
  }
}
</script>
