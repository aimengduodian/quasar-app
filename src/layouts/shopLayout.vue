<template>
  <q-layout view="lHh lpr lFf">
    <!--header-->
    <q-header v-model="getLayout.header" >
      <q-toolbar class="text-white">
        <q-btn round dense flat icon="menu" class="q-mr-xs" />
        <q-input rounded borderless class="full-width q-ml-md" placeholder="点击搜索">
          <template v-slot:append>
            <q-icon @click="" name="search" />
          </template>
        </q-input>
      </q-toolbar>
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
import FooterTabs from 'components/shop-tabs'

export default {
  components: {
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
  },
  watch: {
    '$route.name'(val) {
      if(val === 'shopList') {
        this.updateLayoutMsg({header: true, footer: true})
      }
      if(val === 'shop_view') {
        this.updateLayoutMsg({header: false, footer: false})
      }
      if (val === 'shopPerson') {
        this.updateLayoutMsg({header: false, footer: true})
      }
    }
  }
}
</script>
