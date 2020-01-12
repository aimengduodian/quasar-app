<template>
  <div>
    <div class="head-list">
      <shop-headers/>
      <div class="bg-grey text-white"
           style="opacity:0.6; text-align: center">
        商品列表
      </div>
    </div>

    <div class="q-pa-md">
      <div style="height: 150px"/>
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

            <q-item-section side center>
              <cart-control @change="shopCardChange" :food="item"/>
            </q-item-section>
          </q-item>
          <q-separator spaced/>
        </div>
        <div style="height: 50px"></div>
      </q-infinite-scroll>
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
  import CartControl from './components/cart-control'
  import config from 'src/common/config'

  export default {
    components: {
      NeedVerify,
      shopHeaders,
      shopCart,
      CartControl
    },
    data () {
      return {
        showReport: false,
        reportMsg: null,
        slide: 0,
        scrollOffset: 250,
        items: [],
        itemMsg: {
          buyNumber: null,
          createTime: null,
          dataStatus: null,
          des: null,
          goodName: null,
          goodPic: null,
          goodPrice: null,
          id: null,
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
      },
      shopCardChange(food) {
        console.log(food)
      }
    }
  }
</script>

<style lang="stylus">

  .head-list
    width 100%
    position fixed
    z-index 1

  .shop-cart-wrapper
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px

</style>
