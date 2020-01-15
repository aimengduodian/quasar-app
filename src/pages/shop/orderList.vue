<template>
  <div class="q-pa-md">
    <q-infinite-scroll @load="onLoad" :offset="scrollOffset">
      <div v-for="(item, index) in items" :key="index"
           @click="switch_go(item.id)">
        <q-item>
          <q-item-section>
            <q-item-label>哆啦小店 ￥{{ item.totalCost }}</q-item-label>
            <q-item-label caption>下单地址: {{ item.address }}</q-item-label>
            <q-item-label caption>下单时间:{{ formatOrderDate(item.createTime) }}</q-item-label>
            <q-item-label caption>订单号：{{ item.id }}</q-item-label>
          </q-item-section>
        </q-item>
        <hr>
      </div>
      <!--添加消息-->
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots v-if="!loadAllData" color="primary" size="40px"/>
        </div>
      </template>
      <span v-if="loadAllData" class="row justify-center q-my-md"> 已经没有更多数据 </span>
    </q-infinite-scroll>
    <!--回到顶部-->
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="primary"/>
    </q-page-scroller>

    <!--orderDetail对话框-->
    <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-primary text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">订单详情</div>
        </q-card-section>

        <q-card-section>
          <div style="max-height: 50vh" class="scroll" >
            <q-item v-for="(item, index) in orderFood" :key="index">
              <q-item-section top thumbnail class="q-ml-none">
                <img style="border-radius: 5px" :src="item.displayPic" alt="">
              </q-item-section>

              <q-item-section lines="1" class="q-mt-xs text-body2 text-weight-bold text-uppercase">
                <q-item-label>{{item.goodName}}</q-item-label>
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  <span class="cursor-pointer">共 {{item.buyNumber}} 件</span>
                  <span class="cursor-pointer">￥{{item.goodPrice * item.buyNumber}}</span>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-separator spaced/>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="删除订单" v-close-popup/>
          <q-btn color="primary" label="OK" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import config from 'src/common/config'
  import common from '../../common/common'

  export default {
    data () {
      return {
        persistent: false,
        orderFood: [],
        loadAllData: false,
        scrollOffset: 250,
        items: [],
        params: {
          pageNumber: 1,
          pageSize: config.pageSize
        }
      }
    },
    created () {
      this.init()
    },
    methods: {
      ...mapActions('auth', ['requestUserMsg']),
      init () {
        this.subAdvice()
      },
      async switch_go (id) {
        // 查看订单详情
        const aParams = JSON.parse(JSON.stringify(this.params))
        aParams.id = id
        try{
          this.orderFood = []
          await this.$axios.post('/order/getDetailed', aParams).then((res) => {
            const goods = res.data.page.listinfo[0].goods
            goods.forEach(item => {
              item.displayPic = config.picUrl + item.goodPic
            })
            this.orderFood = goods
            this.persistent = true
          })
        } catch (e) {
          console.log(e)
        }
      },
      async subAdvice () {
        await this.$axios.post('/order/orders', this.params).then((res) => {
          res.data.page.pageInfo.list.forEach(item => {
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
      async onLoad (index, done) {
        setTimeout(() => {
          if (!this.loadAllData) {
            this.subAdvice()
          }
          done()
        }, 2500)
      },
      formatOrderDate (val) {
        return common.toDate(val, 'yyyy-MM-dd HH:mm:ss')
      }
    },
    computed: {
      ...mapGetters('auth', [ 'needVerify', 'getUserMsg'])
    }
  }
</script>
