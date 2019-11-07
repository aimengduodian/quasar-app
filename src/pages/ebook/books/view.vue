<template>
  <q-page class="docs-carousel">
    <q-carousel
      color="white"
      quick-nav
      quick-nav-icon="favorite"
      infinite
      height="150px"
      autoplay
    >
      <q-carousel-slide img-src="http://47.106.222.50:8083/book/5b7a3b244e79406f8f2c8a03b1996a85.jpg" />
      <q-carousel-slide img-src="statics/parallax1.jpg" />
      <q-carousel-slide img-src="statics/parallax2.jpg" />
      <q-carousel-control
        slot="control-button"
        slot-scope="carousel"
        position="bottom-right"
        :offset="[18, 100]"
      >
        <q-btn
          round dense
          color="blue"
          :icon="carousel.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="carousel.toggleFullscreen()"
        />
      </q-carousel-control>
    </q-carousel>
    <br>
    <div class="row justify-around">
      <div class="col-3">
        <img src="statics/boy-avatar.png" style="border-radius: 10px; width: 80%" alt="">
      </div>
      <div class="col-5">
        <div class="q-title">
          <strong>图书名称</strong>
        </div>
        <div class="q-body-2">
          author:xxx
        </div>
        <div class="q-caption">
          出版社：xxxxxx
        </div>
      </div>
      <div class="col-2">
        <q-btn
          round
          size="15px"
          color="primary"
        >
          ￥10
        </q-btn>
      </div>
    </div>
    <br>
    <p class="caption q-body-2" style="margin:0 15px">
      简介:Carousel with custom Quick Navigation and different type of slides content,
      including a vertical scrolling slide (third one).
    </p>
    <br>
    <q-tabs animated swipeable inverted color="secondary" align="justify">
      <q-tab default name="mails" slot="title" icon="mail" label="简要信息" />
      <q-tab name="alarms" slot="title" icon="alarm" label="商品描述" />
      <q-tab name="movies" slot="title" icon="movie" label="卖家信息" />

      <q-tab-pane name="mails">
        <p class="caption">
          Carousel with a model
          and some custom controls: an autoplay button, a progressbar showing Carousel progress
          and a fullscreen toggle button.
          <br>
          Controlling from outside of Carousel:
          Carousel with custom Quick Navigation and different type of slides content,
          including a vertical scrolling slide (third one).
        </p>
      </q-tab-pane>
      <q-tab-pane name="alarms">
        <p class="caption">
          Carousel with a model
          and some custom controls: an autoplay button, a progressbar showing Carousel progress
          and a fullscreen toggle button.
          <br>
          Controlling from outside of Carousel:
          <q-btn
            rounded
            color="primary"
            icon="arrow_downward"
            label="Navigate to second slide"
            class="q-ml-sm"
          />
        </p>
      </q-tab-pane>
      <q-tab-pane name="movies">
        <p class="caption">
          Carousel with a model
          and some custom controls: an autoplay button, a progressbar showing Carousel progress
          and a fullscreen toggle button.
          <br>
          Controlling from outside of Carousel:
          Carousel with custom Quick Navigation and different type of slides content,
          including a vertical scrolling slide (third one).
        </p>
      </q-tab-pane>
    </q-tabs>
  </q-page>
</template>

<script>
export default {

  data() {
    return {
      // 获取详细信息
      book: {
        id: 0,
        bookName: '',
        bookType: '',
        author: '',
        bookPrice: '20',
        pubDate: '2013-12-12',
        bookPub: '',
        bookPic: '',
        weiXin: '',
        phone: '',
        des: ''
      },
      // 图片地址轮播
      urls: []
    }
  },
  methods: {
    initData() {
      const _that = this;

      this.$axios.get('/book/getById' + this.book.id).then(res => {
        _that.book = res.data.page.info
        _that.book.bookType = _that.getBookTypeName(_that.book.bookType)
        const arr = _that.book.bookPic.split(',')
        arr.forEach(item => {
          const pic = 'http://47.106.222.50:8083' + item
          _that.url.push(pic)
        })
      })
    },
    /*
     * 将类型由数字改为字符串
     * @param typeNum
     * @returns {*}
     */
    getBookTypeName(typeNum) {
      const key = 'bookType'
      const aValue = storage.getSession(key)
      let value = aValue[typeNum - 1].text
      if (typeof value === undefined) {
        value = '未知'
        console.error('BookView getBookTypeName: value error')
      }
      return value
    }
  },
  created() {
    this.book.id = this.$route.query.id
    console.log(this.book.id)
    if ((this.book.id).length > 1) {
      this.initData()
    } else {
      this.$q.notify('[error]选择的物品id为0，请检查物品id是否正确!')
    }
  }
}
</script>

<style lang="stylus">
  @import '~variables'

  .docs-carousel
    p.caption:not(:first-of-type)
      margin-top 38px
    .custom-caption
      text-align center
      padding 12px
      color $grey-4
      background rgba(0, 0, 0, .5)
</style>
