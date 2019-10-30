<template>
  <q-page class="row justify-center">
    <q-infinite-scroll :handler="refresher">
      <p v-for="(item, index) in items" :key="index">
        <q-btn style="margin: 0; padding: 0" @click.stop="switch_go">
          <q-card style="margin: 5px 10px; border-radius: 20px;">
            <q-card-media>
              <img alt="" :src="item.elecPic">
              <q-card-title>
                {{ item.electronicsName }}
                <div slot="subtitle">购买时间:{{ item.buyDate }}</div>
                <div slot="subtitle">价格：￥{{ item.presentPrice }}</div>
              </q-card-title>
            </q-card-media>
          </q-card>
        </q-btn>
      </p>
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
import view from './view'
export default {
  components: {
    view
  },
  data () {
    return {
      pageSize: 15,
      pageNumber: 1,
      lastPage: 0,
      items: []
    }
  },
  methods: {
    switch_go () {
      this.$router.push('view')
    },
    splitMth (str) {
      const strs = str.split(',')
      return strs[0]
    },
    subAdvice () {
      const _that = this

      this.$axios.post('/electronics/electronics', {
        pageSize: _that.pageSize,
        pageNumber: _that.pageNumber
      }).then((res) => {
        this.lastPage = res.data.page.pageInfo.lastPage
        res.data.page.pageInfo.list.forEach(item => {
          item.elecPic = 'http://47.106.222.50:8083' + this.splitMth(item.electronicsPic)
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
      }, 100)
    }
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
