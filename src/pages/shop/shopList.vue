<template>
  <div class="q-pa-md">
    <q-infinite-scroll @load="onLoad" :offset="scrollOffset">
      <div v-for="(item, index) in items" :key="index"
           @click="switch_go(item.id)">
        <q-item>
          <q-item-section top thumbnail class="q-ml-none">
            <img style="object-fit: cover; border-radius: 10px" :src="item.bookPic" alt="">
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ item.bookName }}</q-item-label>
            <q-item-label caption>名称:{{ item.superMarketName }}</q-item-label>
            <q-item-label caption>寝楼地址：{{ item.buildingNumber }}</q-item-label>
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
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import config from 'src/common/config'

  export default {
    data () {
      return {
        reRequestTime: config.reRequestBaseInterval,
        reRequestInterval: config.reRequestAddInterval,
        loadAllData: false,
        scrollOffset: 250,
        items: [],
        params: {
          buildingNum: null,
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
      async init () {
        this.loadAllData = true
        await this.requestUserMsg()
        if (this.needVerify) {
          // goto stu.vue
          await this.$router.push({ name: 'verify' })
        } else {
          const user = this.getUserMsg
          if (user.buildingNum === null) {
            // goto select building.vue
            await this.$router.push({ name: 'buildingSelect' })
          } else {
            this.loadAllData = false
            this.params.buildingNum = user.buildingNum
            this.subAdvice()
          }
        }
      },
      switch_go (id) {
        if (this.getUserMsg.id === id) {
          // 自己的商铺
          this.$router.push({ name: 'goods_edit', query: { id: id } })
        } else {
          this.$router.push({ name: 'shop_view', query: { id: id } })
        }
      },
      async subAdvice () {
        this.scrollOffset = -Math.abs(this.scrollOffset)
        await this.$axios.post('/user/getsuperMarkets', this.params).then((res) => {
          res.data.page.pageInfo.list.forEach(item => {
            this.items.push(item)
          })
          if (!res.data.page.pageInfo.isLastPage) {
            this.params.pageNumber++
          } else {
            this.loadAllData = true
            this.scrollOffset = Math.abs(this.scrollOffset)
          }
        }).catch(err => {
          if (err === undefined) {
            this.reRequestTime = this.reRequestTime + this.reRequestInterval
            setTimeout(() => {
              this.subAdvice()
            }, this.reRequestTime)
          }
        })
      },
      async onLoad (index, done) {
        if (!this.loadAllData) {
          this.subAdvice()
        }
        done()
      }
    },
    computed: {
      ...mapGetters('auth', ['needVerify', 'getUserMsg'])
    }
  }
</script>
