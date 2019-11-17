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
      <q-carousel-slide v-for="(item, index) in urls" :key="index" :img-src="item" />
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
        <img style="border-radius: 10px; width: 80%"
             src="statics/boy-avatar.png"
             alt="head picture">
      </div>
      <div class="col-5">
        <div class="q-title">
          <strong>{{ other.otherName }}</strong>
        </div>
        <div class="q-body-2">
          original price: {{ other.originalPrice }}
        </div>
        <div class="q-caption">
          buy data：{{ other.buyDate }}
        </div>
      </div>
      <div class="col-2">
        <q-btn
          round
          size="15px"
          color="primary"
        >
          ￥{{ other.presentPrice }}
        </q-btn>
      </div>
    </div>
    <br>
    <q-tabs animated inverted color="secondary" align="justify">
      <q-tab default name="mails" slot="title" label="简要信息" />
      <q-tab name="alarms" slot="title" label="商品描述" />
      <q-tab name="movies" slot="title" label="卖家信息" />
      <div class="bgc">
        <q-tab-pane name="mails">
          <div> other type is {{ other.otherType }}</div>
          <div> public data is {{ other.pubDate }} </div>
        </q-tab-pane>
        <q-tab-pane name="alarms">
          <p class="caption q-body-2">
            简介: {{ other.des }}
          </p>
        </q-tab-pane>
        <q-tab-pane name="movies">
          <need-verify />
          <div v-if="false">
            <div>phone: {{ other.phone }}</div>
            <div>weixin: {{ other.weiXin }}</div>
          </div>
        </q-tab-pane>
      </div>
    </q-tabs>
  </q-page>
</template>

<script>
import NeedVerify from 'pages/verify/needVerify'

export default {
  data () {
    return {
      // 获取详细信息
      other: {
        id: 0,
        buyDate: 0,
        createTime: 0,
        otherName: '',
        otherType: '',
        hasInvoice: '',
        presentPrice: 0,
        originalPrice: 0,
        otherPic: '',
        weiXin: '',
        phone: '',
        des: '',
        viewTimes: ''
      },
      // 图片地址轮播
      urls: []
    }
  },
  components: {
    NeedVerify
  },
  methods: {
    initData () {
      this.$axios.get('/other/getById/' + this.other.id).then(res => {
        this.other = res.data.page.info
        // console.log(this.other)
        // this.other.otherType = this.getotherTypeName(this.other.otherType)
        const arr = this.other.otherPic.split(',')
        arr.forEach(item => {
          const pic = 'http://47.106.222.50:8083' + item
          this.urls.push(pic)
        })
      })
    }
  },
  created () {
    this.other.id = this.$route.query.id
    if ((this.other.id).length > 1) {
      this.initData()
    }
    else {
      this.$q.notify('[error]选择的物品id为0，请检查物品id是否正确!')
    }
  }
}
</script>

<style lang="stylus">


  .docs-carousel
    p.caption:not(:first-of-type)
      margin-top 38px
    .custom-caption
      text-align center
      padding 12px
      color $grey-4
      background rgba(0, 0, 0, .5)
  .bgc
    background-color #ffffff
      min-height 42.5vh
      height 100%
</style>
