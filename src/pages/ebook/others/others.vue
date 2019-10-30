<template>
  <q-page class="row justify-center">
    <q-infinite-scroll class="item_style" :handler="refresher">
      <div v-for="(item, index) in items" :key="index">
        <div class="row justify-around other-card">
          <div class="col-3">
            <img :src="item.otherPic" style="width: 80%" alt="">
          </div>
          <div class="col-5">
            <div class="q-title">
              {{ item.otherName }}
            </div>
            <div class="q-body-2">
              价格：￥{{ item.presentPrice }}
            </div>
            <div class="q-caption">
              描述
            </div>
          </div>
          <div class="col-2">
            <q-btn
              round
              size="15px"
              color="primary"
              label="Text height: 10px"
              @click="switch_go"
            />
          </div>
        </div>
      </div>

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
      pageSize: 5,
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

      this.$axios.post('/other/others', {
        pageSize: _that.pageSize,
        pageNumber: _that.pageNumber
      }).then((res) => {
        this.lastPage = res.data.page.pageInfo.lastPage
        res.data.page.pageInfo.list.forEach(item => {
          item.otherPic = 'http://47.106.222.50:8083' + this.splitMth(item.otherPic)
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

  .item_style
    width 100%
    margin 10px 0
    border-radius 15px

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

  .other-card
    height 15vh
    background-color #dedede
    margin 10px 15px
    border-radius 10px
    >div
      margin auto
      >img
        border-radius 5px
        height 80%
</style>
