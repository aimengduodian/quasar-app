<template>
  <div class="q-pa-md">
    <q-infinite-scroll @load="onLoad" :offset="250">
      <div v-for="(item, index) in items" :key="index"
           @click="switch_go(item.id)">
        <q-item>
          <q-item-section top thumbnail class="q-ml-none">
            <img style="object-fit: cover; border-radius: 10px" :src="item.elecPic" alt="" >
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ item.electronicsName }}</q-item-label>
            <q-item-label mask="YYYY-MM-DD HH:mm:ss" caption>购买时间:{{ formatElectronicsDate(item.buyDate) }}</q-item-label>
            <q-item-label caption>价格：￥{{ item.presentPrice }}</q-item-label>
          </q-item-section>
        </q-item>
        <hr>
      </div>
      <!--添加消息-->
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots v-if="!loadAllData" color="primary" size="40px" />
          <span v-else> 已经没有更多数据 </span>
        </div>
      </template>
    </q-infinite-scroll>
    <!--回到顶部-->
    <q-page-scroller v-if="!flag" position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="primary" />
    </q-page-scroller>
    <q-page-scroller v-else position="bottom-right" :scroll-offset="-150" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="addElectronics" />
    </q-page-scroller>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { date } from 'quasar'
import config from 'src/common/config'

export default {
  data () {
    return {
      loadAllData: false,
      pageSize: 15,
      pageNumber: 1,
      lastPage: 0,
      items: []
    }
  },
  created () {
    this.subAdvice()
  },
  methods: {
    addElectronics () {
      // goto 发布界面
      this.$router.push({ name: 'electronics_add' })
    },
    switch_go (id) {
      let itemId = 0
      if (!this.powerFlag) {
        itemId = id
      }
      this.$router.push({ name: 'electronics_view', query: { id: itemId } })
    },
    splitMth (str) {
      const strs = str.split(',')
      return strs[0]
    },
    async subAdvice () {
      await this.$axios.post('/electronics/electronics', {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber
      }).then((res) => {
        this.lastPage = res.data.page.pageInfo.lastPage
        res.data.page.pageInfo.list.forEach(item => {
          item.elecPic = config.picUrl + this.splitMth(item.electronicsPic)
          this.items.push(item)
        })
        if (!res.data.page.pageInfo.isLastPage) {
          this.pageNumber++
        } else {
          this.loadAllData = true
        }
      })
    },
    onLoad (index, done) {
      setTimeout(() => {
        if (!this.loadAllData) {
          this.subAdvice()
          done()
        }
      }, 2500)
    },
    formatElectronicsDate (val) {
      return date.formatDate(val, 'YYYY-MM-DD')
    }
  },
  computed: {
    ...mapState('auth', ['flag']),
    ...mapGetters('auth', ['power', 'powerFlag'])
  }
}
</script>
