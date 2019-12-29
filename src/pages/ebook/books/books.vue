<template>
  <div class="q-pa-md">
    <q-infinite-scroll @load="onLoad" :offset="250" >
      <div v-for="(item, index) in items" :key="index"
           @click="switch_go(item.id)">
        <q-item>
          <q-item-section top thumbnail class="q-ml-none">
            <img style="object-fit: cover; border-radius: 10px" :src="item.bookPic" alt="" >
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ item.bookName }}</q-item-label>
            <q-item-label caption>出版社:{{ item.bookPub }}</q-item-label>
            <q-item-label caption>价格：￥{{ item.bookPrice }}</q-item-label>
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
      <q-btn fab icon="add" color="primary" @click="addBooks" />
    </q-page-scroller>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import config from 'src/common/config'

export default {
  data () {
    return {
      loadAllData: false,
      items: [],
      params: {
        pageSize: 15,
        pageNumber: 1
      }
    }
  },
  created () {
    this.updateLayoutMsg({header: true, footer: true})
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
        }
      })
    },
    async onLoad (index, done) {
      setTimeout(() => {
        if (!this.loadAllData) {
          this.subAdvice()
          done()
        }
      }, 2500)
    }
  },
  computed: {
    ...mapState('auth', ['flag', 'searchParams']),
    ...mapGetters('auth', ['power', 'powerFlag'])
  },
  watch: {
    searchParams(val) {
      this.loadAllData = false
      this.items = []
      this.params.pageNumber = 1
      this.params.pageSize = 15

      const data = JSON.parse(JSON.stringify(val))
      Object.keys(data).forEach(key => {
        this.params[key] = data[key]
      })
      this.subAdvice()
    }
  }
}
</script>
