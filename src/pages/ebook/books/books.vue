<template>
  <div class="q-pa-md">
    <q-infinite-scroll @load="onLoad" :offset="scrollOffset" >
      <div v-for="(item, index) in items" :key="index"
           @click="switch_go(item.id)">
        <q-item>
          <q-item-section top thumbnail class="q-ml-none">
            <img style="object-fit: cover; border-radius: 10px" :src="item.bookPic" alt="" >
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ item.bookName }}</q-item-label>
            <q-item-label caption>出版社:{{ item.bookPub }}</q-item-label>
            <q-item-label caption>发布日期：{{ formatBookDate(item.createTime) }}</q-item-label>
          </q-item-section>
        </q-item>
        <hr>
      </div>
      <!--添加消息-->
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots v-if="!loadAllData" color="primary" size="40px" />
        </div>
      </template>
      <span v-if="loadAllData" class="row justify-center q-my-md" > 已经没有更多数据 </span>
    </q-infinite-scroll>
    <!--回到顶部-->
    <q-page-scroller v-if="!flag" position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="primary" />
    </q-page-scroller>
    <q-page-scroller v-else position="bottom-right" :scroll-offset="-150" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="addBooks" />
    </q-page-scroller>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import config from 'src/common/config'
import { date } from 'quasar'

export default {
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
    this.updateLayoutMsg({header: true, footer: true})
    this.params = this.getSearchParamsMsg
    this.subAdvice()
  },
  methods: {
    ...mapActions('auth', ['updateLayoutMsg']),
    addBooks () {
      // goto 发布界面
      this.$router.push({ name: 'books_add' })
    },
    switch_go (id) {
      let itemId = 0
      if (!this.powerFlag) {
        itemId = id
      }
      this.$router.push({ name: 'books_view', query: { id: itemId } })
    },
    splitMth (str) {
      const strs = str.split(',')
      return strs[0]
    },
    async subAdvice () {
      await this.$axios.post('/book/books?flag=' + this.flag, this.params).then((res) => {
        res.data.page.pageInfo.list.forEach(item => {
          item.bookPic = config.picUrl + this.splitMth(item.bookPic)
          this.items.push(item)
        })
        if (!res.data.page.pageInfo.isLastPage) {
          this.params.pageNumber++
        } else {
          this.loadAllData = true
          if (this.scrollOffset > 0)
            this.scrollOffset = - this.scrollOffset
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
    formatBookDate (val) {
      return date.formatDate(val, 'YYYY-MM-DD')
    }
  },
  computed: {
    ...mapState('auth', ['flag']),
    ...mapGetters('auth', ['power', 'powerFlag', 'getSearchParamsMsg'])
  },
  watch: {
    getSearchParamsMsg(val) {
      this.loadAllData = false
      this.items = []
      this.params = []
      if (this.scrollOffset < 0)
        this.scrollOffset = - this.scrollOffset
      const data = JSON.parse(JSON.stringify(val))
      Object.keys(data).forEach(key => {
        this.params[key] = data[key]
      })
      this.subAdvice()
    }
  }
}
</script>
