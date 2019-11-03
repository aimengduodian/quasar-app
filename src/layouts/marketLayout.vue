<template>
  <q-layout view="lHh LpR lFf">
    <!--header-->
    <q-layout-header :reveal="headerReveal">
      <div class="row header" >
        <div class="col-2">
          <q-btn flat icon="mail" @click.native="show()"/>
        </div>
        <div class="col-8">
          <img src="" alt="headerPic">
        </div>
        <div class="col-2" style="margin: auto 0">
          <q-btn flat icon="search" @click.native="show()"/>
        </div>
      </div>
    </q-layout-header>
    <!--footer-->
    <q-layout-footer :reveal="footerReveal">
      <footer-tabs/>
    </q-layout-footer>
    <!--modal-->
    <q-modal v-model="layoutModal"
             :content-css="{minWidth: '100vw', minHeight: '100vh'}">
      <q-modal-layout>
        <q-toolbar color="secondary" slot="header">
          <q-btn
            flat
            round
            @click="layoutModal = false"
            icon="reply"
          />
          <q-toolbar-title>
            <q-search inverted color="light"
                      @click.native="show()"
                      v-model="terms"
                      placeholder="点击搜索">
              <q-autocomplete
                @search="search"
                @selected="selected"
              />
            </q-search>
          </q-toolbar-title>
        </q-toolbar>

        <q-toolbar color="white" slot="footer">
          <q-toolbar-title>
            Footer
          </q-toolbar-title>
        </q-toolbar>

        <div class="layout-padding">
          <!--content-->
        </div>
      </q-modal-layout>
    </q-modal>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { uid } from 'quasar'
import FooterTabs from 'components/market-tabs'
import countries from 'assets/autocomplete.json'

const icons = ['alarm', 'email', 'search']

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
    FooterTabs
  },
  data () {
    return {
      terms: '',
      layoutModal: false,
      countries: parseCountries(),
      headerReveal: false,
      footerReveal: false
    }
  },
  methods: {
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
      console.log(arr)
      done(arr)
    },
    selected (item) {
      this.$q.notify(`Selected suggestion "${item.label}"`)
    },
    funDame () {
      let aArr = []
      let item = {
        label: '123',
        sublabel: 'abc',
        icon: 'search',
        value: 'search'
      }
      aArr.push(item)
      return aArr
    }
  }
}
</script>

<style lang="stylus">
  @import '~variables'
  .header
    text-align: center
    height: 50px
    background: #26a59a
    > div
      margin: auto 0
</style>
