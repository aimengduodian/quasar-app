<template>
  <q-layout view="lHh LpR lFf">
    <!--header-->
    <q-layout-header :reveal="headerReveal">
      <div>
        <div class="row" style="background: bisqued">
          <div class="col-10" />
          <div class="col-2">
            <q-btn flat icon="search" @click.native="show()"/>
          </div>
        </div>
      </div>
    </q-layout-header>
    <!--footer-->
    <q-layout-footer :reveal="footerReveal">
      <footer-tabs/>
    </q-layout-footer>
    <!--modal-->
    <q-modal v-model="layoutModal"
             :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-btn
            flat
            round
            dense
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

        <q-toolbar slot="footer">
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
import FooterTabs from 'components/market-tabs'
import { uid, filter } from 'quasar'
import countries from 'assets/autocomplete.json'

const icons = ['alarm', 'email', 'search',
  'build', 'card_giftcard', 'perm_identity',
  'receipt', 'schedule', 'speaker_phone',
  'archive', 'weekend', 'battery_charging_full'
]

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
