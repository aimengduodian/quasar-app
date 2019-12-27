<template>
  <div>
    <q-toolbar class="text-white">
      <q-btn round dense flat icon="menu"
             @click="visible = !visible" class="q-mr-xs" />
      <q-input rounded borderless v-model="terms"
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
    <q-separator />
    <div class="justify-center row" style="text-align: center">
      <div class="col">
        <q-btn flat icon="group" label="发布日期" />
      </div>
      <div class="col">
        <q-btn flat icon="money" label="价格" />
      </div>
    </div>
    <q-slide-transition>
      <div v-show="visible" class="bg-white">
        <div style="padding: 10px 20px">
          <q-select borderless v-model="bookType" value=""
                    :options="getBookTypeNameArr" prefix="分类:">
          </q-select>
          <q-separator />
          <div class="row">
            <q-input rounded borderless v-model="terms"
                     class="full-width col" type="number"
                     placeholder="最低" prefix="价格:" suffix="￥  —">
            </q-input>
            <q-input rounded borderless v-model="terms"
                     class="full-width col" type="number"
                     placeholder="最高" suffix="￥">
            </q-input>
          </div>
          <q-separator />
          <div class="row">
            <q-input v-model="pubDate" value="" borderless
                     class="full-width col"
                     readonly prefix="日期:" suffix="—">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <date-time :max-date="maxDate" :is-time=false @input="setBookPubDate"/>
              </q-popup-proxy>
            </q-input>

            <q-input v-model="pubDate" value="" borderless
                     class="full-width col q-ml-md"
                     readonly>
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <date-time :max-date="maxDate" :is-time=false @input="setBookPubDate"/>
              </q-popup-proxy>
            </q-input>
          </div>
        </div>

        <div class="row">
          <q-btn flat class="col bg-grey-2 text-black">重置</q-btn>
          <q-btn flat class="col bg-primary" >搜索</q-btn>
        </div>
      </div>
    </q-slide-transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import DateTime from 'components/dateTimeOption'

export default {
  components: {
    DateTime
  },
  props: {
  },
  data() {
    return {
      terms: '',
      visible: false,
      bookType: null,
    }
  },
  computed: {
    ...mapGetters('staticData', ['getBookTypeNameArr', 'getBookTypeNumberByName','getElectronicsTypeNameArr', 'getElectronicsTypeNumberByName'])
  },
  methods: {
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
  }
}
</script>
