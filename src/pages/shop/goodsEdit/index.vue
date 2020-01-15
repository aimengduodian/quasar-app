<template>
  <div class="q-pa-md">
    <q-infinite-scroll @load="onLoad" :offset="scrollOffset">
      <div v-for="(item, index) in items" :key="index"
           @click="switch_go(item.id)">
        <q-item>
          <q-item-section top thumbnail class="q-ml-none">
            <img style="object-fit: cover; border-radius: 10px" :src="item.goodsPic" alt="">
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ item.electronicsName }}</q-item-label>
            <q-item-label mask="YYYY-MM-DD HH:mm:ss" caption>商品名称:{{ item.goodName }}
            </q-item-label>
            <q-item-label caption>价格：￥{{ item.goodPrice }}</q-item-label>
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

    <q-page-scroller position="bottom-right" :scroll-offset="-150" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="addGoods"/>
    </q-page-scroller>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import config from 'src/common/config'

  export default {
    name: 'electronics',
    data () {
      return {
        loadAllData: false,
        scrollOffset: 250,
        items: [],
        params: {
          pageSize: 15,
          pageNumber: 1
        }
      }
    },
    created () {
      this.params = this.getSearchParamsMsg
      this.params.pageNumber = 1
      this.subAdvice()
    },
    methods: {
      addGoods () {
        // goto 发布界面
        this.$router.push({ name: 'goods_add' })
      },
      switch_go (id) {
        this.$router.push({ name: 'goods_view', query: { id: id } })
      },
      splitMth (str) {
        const strs = str.split(',')
        return strs[0]
      },
      async subAdvice () {
        await this.$axios.post('/good/goods', this.params).then((res) => {
          res.data.page.pageInfo.list.forEach(item => {
            item.goodsPic = config.picUrl + this.splitMth(item.goodPic)
            this.items.push(item)
          })
          if (!res.data.page.pageInfo.isLastPage) {
            this.pageNumber++
          } else {
            this.loadAllData = true
            if (this.scrollOffset > 0)
              this.scrollOffset = -this.scrollOffset
          }
        })
      },
      onLoad (index, done) {
        setTimeout(() => {
          if (!this.loadAllData) {
            this.subAdvice()
          }
          done()
        }, 2500)
      }
    },
    computed: {
      ...mapGetters('auth', [ 'needVerify', 'getSearchParamsMsg'])
    },
    watch: {
      getSearchParamsMsg (val) {
        if (this.$route.name === 'electronics') {
          this.loadAllData = false
          this.items = []
          this.params = []
          if (this.scrollOffset < 0)
            this.scrollOffset = -this.scrollOffset
          const data = JSON.parse(JSON.stringify(val))
          Object.keys(data).forEach(key => {
            this.params[key] = data[key]
          })
          this.subAdvice()
        }
      }
    }
  }
</script>
