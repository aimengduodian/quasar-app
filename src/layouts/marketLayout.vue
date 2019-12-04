<template>
  <q-layout view="lHh lpr lFf">
    <!--header-->
    <q-header bordered class="bg-white text-primary">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" alt="">
          </q-avatar>
          西林易市
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <!--footer-->
    <q-footer bordered class="bg-white text-primary">
      <footer-tabs/>
    </q-footer>

    <!--modal-->
    <!-- <q-layout v-model="layoutModal">
      <q-toolbar
        slot="header">
        <q-btn
          flat
          round
          @click="layoutModal = false"
          icon="reply"
        />
        <q-toolbar-title>
          <q-search inverted color="white"
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
      <div class="layout-padding">
      </div>
    </q-layout>-->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from 'vuex'
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
      countries: parseCountries()
    }
  },
  methods: {
    ...mapActions('staticData', ['updateStaticCache']),
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
    this.$q['fullscreen'].toggle()
    this.init()
  }
}
</script>
