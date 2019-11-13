<template>
  <q-page class="row justify-center">
    <q-infinite-scroll :handler="refresher">
      <q-btn v-for="(item, index) in items" :key="index"
             style="margin: 0; padding: 0; width: 100%"
             @click="switch_go(item.id)">
        <q-card style="margin: 5px 4%; width: 96%; border-radius: 20px;">
          <q-card-media>
            <img alt="" :src="item.bookPic">
            <q-card-title slot="overlay">
              {{ item.bookName }}
              <div slot="subtitle">出版社:{{ item.bookPub }}</div>
              <div slot="subtitle">价格：￥{{ item.bookPrice }}</div>
            </q-card-title>
          </q-card-media>
          <q-card-actions align="around">
            <q-btn flat round color="red" icon="favorite" />
            <q-btn flat round color="faded" icon="bookmark" />
            <q-btn flat round color="primary" icon="share" />
          </q-card-actions>
        </q-card>
      </q-btn>
      <!--添加消息-->
      <div class="row justify-center" style="margin-bottom: 50px;">
        <q-spinner-dots slot="message" :size="40" />
      </div>
    </q-infinite-scroll>
    <!--返回到顶部-->
    <q-page-sticky position="bottom-left" :offset="[0, 100]">
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
import { mapGetters } from 'vuex'

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
    subAdvice () {
      this.$axios.post('/book/books?flag=1', {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber
      }).then((res) => {
        this.lastPage = res.data.page.pageInfo.lastPage
        res.data.page.pageInfo.list.forEach(item => {
          item.bookPic = 'http://47.106.222.50:8083' + this.splitMth(item.bookPic)
          this.items.push(item)
        })
        if (!res.data.page.pageInfo.isLastPage) {
          this.pageNumber++
        }
      })
    },
    refresher (index, done) {
      setTimeout(() => {
        this.subAdvice()
        done()
      }, 100)
    }
  },
  computed: {
    ...mapGetters('auth', ['power', 'powerFlag'])
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
    background-color $cyan
    border-radius 0 15px 15px 0
    &:hover
      color $grey-4

    .q-card
      width 80%
</style>
