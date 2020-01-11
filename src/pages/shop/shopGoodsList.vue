<template>
  <div>
    <shop-headers/>
    <div>
      <q-tabs
        dense
        class="bg-grey text-white"
        indicator-color="grey"
        align="justify"
        style="opacity:0.6"
      >
        <q-tab name="mails" label="商品列表"/>
      </q-tabs>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="mails">
          <q-infinite-scroll @load="onLoad" :offset="scrollOffset">
            <div v-for="(item, index) in items" :key="index">
              <q-item>
                <q-item-section top thumbnail class="q-ml-none">
                  <img :src="item.pic" alt="">
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{item.goodName}}</q-item-label>
                  <q-item-label caption>{{item.des}}</q-item-label>
                  <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
                    <span class="cursor-pointer">￥{{item.goodPrice}}</span>
                  </q-item-label>
                </q-item-section>

                <q-item-section side top>
                  <q-item-label caption>meta</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator spaced/>
            </div>
          </q-infinite-scroll>
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <!--购物车-->
    <div class="shop-cart-wrapper">
      <shop-cart
        ref="shopCart"
        :select-foods="selectedFood"
        :delivery-price=12
        :min-price=10
      />
    </div>
  </div>

</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import NeedVerify from 'components/needVerify'
  import shopHeaders from './components/shopHeaders'
  import shopCart from './components/shopCart'
  import config from 'src/common/config'

  export default {
    components: {
      NeedVerify,
      shopHeaders,
      shopCart
    },
    data () {
      return {
        showReport: false,
        reportMsg: null,
        tab: 'mails',
        slide: 0,
        scrollOffset: 250,
        items: [],
        // 获取详细信息
        goods: {
          buyNumber: null,
          createTime: 1561902960000,
          dataStatus: 1,
          des: '去微软推哦的法国红酒看来',
          goodName: 'huaduo',
          goodPic: '/good/d3930a5a24c340eeb7ed889eb134a3b9.jpg',
          goodPrice: 0,
          id: '',
          orderId: null,
          updateTime: null,
          updateUser: null,
          viewTimes: null
        },
        params: {
          id: null,
          pageSize: config.pageSize,
          pageNumber: 1
        },
        selectedFood: []
      }
    },
    created () {
      // 商铺的name和id
      this.params.id = this.$route.query.id
      if (this.params.id !== null) {
        this.subAdvice()
      } else {
        this.$q.notify('为获取到商铺信息！')
      }
    },
    computed: {
      ...mapGetters('auth', ['power', 'getFlag', 'powerFlag']),
      ...mapGetters('staticData', ['getBookTypeNameByNumber'])
    },
    methods: {
      ...mapActions('auth', ['updatePageMsg']),
      subAdvice () {
        this.$axios.post('/good/goods', this.params).then(res => {
          res.data.page.pageInfo.list.forEach(item => {
            item.pic = config.picUrl + this.splitMth(item.goodPic)
            this.items.push(item)
          })
          if (!res.data.page.pageInfo.isLastPage) {
            this.params.pageNumber++
          } else {
            this.loadAllData = true
            if (this.scrollOffset > 0)
              this.scrollOffset = -this.scrollOffset
          }
        })
      },
      splitMth (str) {
        const strs = str.split(',')
        return strs[0]
      },
      onLoad (index, done) {
        setTimeout(() => {
          if (!this.loadAllData) {
            this.subAdvice()
          }
          done()
        }, 10000)
      }
    }
  }
</script>

<style lang="stylus">
  .shop-cart-wrapper
    position: absolute
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
</style>
