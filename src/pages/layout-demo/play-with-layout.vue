<template>
  <q-page padding class="row justify-center">

    <q-infinite-scroll :handler="refresher">
      <p v-for="(item, index) in items"
         :key="index">
        <q-card style="margin: 0 20px">
          <q-card-media overlay-position="full">
            <img alt="" :src="item.bookPic">
            <q-card-title slot="overlay">
              {{ item.bookName }}
              <div slot="subtitle">出版社:{{ item.bookPub }}</div>
              <div slot="subtitle">价格：￥{{ item.bookPrice }}</div>
            </q-card-title>
          </q-card-media>
          <q-card-actions>
            <q-btn flat>Action 1</q-btn>
            <q-btn flat>Action 2</q-btn>
          </q-card-actions>
        </q-card>
      </p>
      <!--添加消息-->
      <div class="row justify-center" style="margin-bottom: 50px;">
        <q-spinner-dots slot="message" :size="40" />
      </div>
    </q-infinite-scroll>
    <!--返回到顶部-->
    <q-page-sticky position="top-left" :offset="[0, 100]">
      <a
        v-back-to-top.animate="1000"
        class="animate-pop play-backtotop non-selectable shadow-2"
        v-ripple.mat
      >
        Back to top
      </a>
    </q-page-sticky>

  </q-page>
</template>

<script>
export default {
  data () {
    return {
      pageSize: 5,
      pageNumber: 1,
      lastPage: 0,
      items: []
    }
  },
  methods: {
    splitMth (str) {
      const strs = str.split(',')
      return strs[0]
    },
    subAdvice () {
      const _that = this
      this.$axios.get('/api/book/books', {
        params: {
          pageSize: _that.pageSize,
          pageNumber: _that.pageNumber
        }
      }).then((res) => {
        this.lastPage = res.data.page.pageInfo.lastPage
        res.data.page.pageInfo.list.forEach(item => {
          item.bookPic = 'http://47.106.222.50:8083' + this.splitMth(item.bookPic)
          this.items.push(item)
        })
        if (!res.data.page.pageInfo.isLastPage) {
          _that.pageNumber++
        }
      })
    },
    refresher (index, done) {
      setTimeout(() => {
        this.subAdvice()
        done()
      }, 1000)
    }
  },
  created () {
    this.subAdvice()
  }
}
</script>

<style lang="stylus">
  @import '~variables'

  .play-backtotop
    color white
    top 30%
    padding 15px
    width 90px
    background-color $secondary
    border-radius 0 15px 15px 0
    &:hover
      color $grey-4

    .q-card
      width 80%
</style>
