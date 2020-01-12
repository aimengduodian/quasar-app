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
        <div v-for="(item, index) in selectedFood" :key="index">
          <q-item>
            <q-item-section top thumbnail class="q-ml-none">
              <img style="border-radius: 5px" :src="item.pic" alt="">
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

    <!--提交-->
    <q-dialog v-model="submitDialog">
      <q-card style="width: 70vw">
        <q-card-actions>
          <q-icon name="close" flat @click.stop="submitDialog = false"/>
        </q-card-actions>
        <q-separator/>
        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="place"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis"></div>
          </div>
        </q-card-section>

        <q-card-section>
          <div class="text-subtitle1">
            <div>
              寝楼: <span class="text-subtitle2 text-grey">{{getUserMsg.buildingNum}}</span>
            </div>
            <div>
              寝室: <span class="text-subtitle2 text-grey">{{getUserMsg.buildingRoomNum}}</span>
            </div>
            <div>
              手机: <span class="text-subtitle2 text-grey">{{getUserMsg.phone}}</span>
            </div>
            <div>
              邮箱: <span class="text-subtitle2 text-grey">{{getUserMsg.email}}</span>
            </div>
          </div>
        </q-card-section>

        <q-separator/>

        <q-card-actions>
          <q-btn label="取消" @click.stop="submitDialog = false"/>
          <q-btn color="primary" label="确认" @click.stop="onSubmitShopCart"/>
        </q-card-actions>

      </q-card>
    </q-dialog>

    <!--添加到购物车中的物品-->
    <q-dialog v-model="dialog" position="bottom">
      <q-card style="width: 100%">
        <div>
          <q-btn flat>购物车</q-btn>
          <q-btn flat style="float: right" @click="empty">清空</q-btn>
        </div>
        <q-separator/>
        <div style="max-height: 50vh; overflow: scroll">
          <q-card-section class="items-center no-wrap">
            <div v-for="(item, index) in selectedFood"
                 v-if="item.count" :key="index">
              <q-item>
                <q-item-section top thumbnail class="q-ml-none">
                  <img style="border-radius: 5px" :src="item.pic" alt="">
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{item.goodName}}</q-item-label>
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
                    <span class="cursor-pointer">￥{{item.goodPrice * item.count}}</span>
                  </q-item-label>
                </q-item-section>

                <q-item-section side center>
                  <cart-control @change="shopCardChange" :food="item"/>
                </q-item-section>
              </q-item>
              <q-separator spaced/>
            </div>
          </q-card-section>
        </div>

        <br>
      </q-card>
    </q-dialog>
    <!--购物车-->
    <div class="shop-cart-wrapper">
      <shop-cart
        ref="shopCart"
        @open="dialog = !dialog"
        @submit="submitDialog = !submitDialog"
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
        dialog: false,
        scrollOffset: 250,
        selectedFood: [],
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
        submitDialog: false
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
      ...mapGetters('auth', ['power', 'getFlag', 'powerFlag', 'getUserMsg']),
      ...mapGetters('staticData', ['getBookTypeNameByNumber'])
    },
    methods: {
      ...mapActions('auth', ['updatePageMsg']),
      subAdvice () {
        this.$axios.post('/good/goods', this.params).then(res => {
          res.data.page.pageInfo.list.forEach(item => {
            item.pic = config.picUrl + this.splitMth(item.goodPic)
            this.selectedFood.push(item)
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
      shopCardChange (target) {
        this.$refs.shopCart.drop(target)
      },
      async onSubmitShopCart () {
        this.dialog = false
        this.submitDialog = false

        const goods = [] //购物车中的商品集合
        let totalNum = 0 //总数量
        let totalCost = 0 //总价格
        this.selectedFood.forEach(item => {
          if (item.count) {
            goods.push({
              id: item.id,
              buyNumber: item.count
            })
            totalNum = totalNum + item.count
            totalCost = totalCost + item.count * item.goodPrice
          }
        })
        const params = {
          phone: this.getUserMsg.phone,
          address: this.getUserMsg.buildingRoomNum || '11-2-725',
          totalNum: totalNum,
          totalCost: totalCost,
          goods: JSON.stringify(goods)
        }
        try {
          this.$q.loading.show({
            message: '正在提交数据...'
          })
          await this.$axios.post('/order/save', params).then((res) => {
            if (res.data.code === 100) {
              this.$q.notify(res.data.msgs.msg)
            }
            else {
              this.$q.notify('Fail')
            }
            // 跳转回原页面
            this.$router.go(-1)
          })
        }
        catch (e) {
          console.log(e)
        }
        finally {
          this.$q.loading.hide()
          this.selectedFood.forEach(item => {
            if (item.count) {
              item.count = 0
            }
          })
        }
      },
      empty () {
        this.$q.dialog({
          title: '确认？',
          message: '确认清空购物车!',
          cancel: true,
          persistent: true
        }).onOk(data => {
            this.selectedFood.forEach(item => {
              if (item.count) {
                item.count = 0
              }
            })
            this.dialog = false
          }
        )
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
    z-index: 6001
    width: 100%
    height: 48px


</style>
