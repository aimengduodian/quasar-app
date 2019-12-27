<template>
  <q-layout view="lHh lpr lFf">
    <!--header-->
    <q-header v-model="layout.header" class="">
      <q-toolbar class="text-white">
        <q-btn round dense flat icon="menu"
               @click="visible = !visible" class="q-mr-xs" />
        <q-space />
        <q-input dark borderless
          @click.native="show()"
          v-model="terms"
          class="full-width q-ml-md"
          placeholder="点击搜索"
        >
          <template v-slot:append>
            <q-icon v-if="terms === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer"
                    @click="terms = ''" />
          </template>
        </q-input>
      </q-toolbar>
      <div class="row">
        <div class="col">1</div>
        <q-space />
        <div class="col">1</div>
        <q-space />
        <div class="col">1</div>
      </div>
      <q-slide-transition>
        <div v-show="visible">
          <img
            class="responsive"
            src="https://cdn.quasar.dev/img/quasar.jpg"
          >
        </div>
      </q-slide-transition>
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
import FooterTabs from 'components/market-tabs'

export default {
  components: {
    FooterTabs
  },
  data () {
    return {
      terms: '',
      layoutModal: false,
      visible: false
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
    async search (terms, done) {
      const arr = []
      const msg = {
        bookName: terms,
        pageNumber: 0,
        pageSize: 10
      }
      // ajax
      await this.$axios.post('/book/books', msg).then((res) => {
        res.data.page.pageInfo.list.forEach(item => {
          let aItem = {}
          aItem.value = item.id
          aItem.label = item.bookName
          aItem.sublabel = item.bookPub
          arr.push(aItem)
        })
      })
      // done(filter(terms, {field: 'value', list: parseCountries()}))
      done(arr)
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

      // const userDetail = await this.$axios.post('/book/books?flag=0', {
      //   pageSize: 1,
      //   pageNumber: 1
      // }).then(res => {
      //   return res.data.page.userInfo
      // })
      // await this.updateUserCache({userDetail})
    }
  },
  created () {
    // this.$q['fullscreen'].toggle()
    this.init()
  }
}
</script>
