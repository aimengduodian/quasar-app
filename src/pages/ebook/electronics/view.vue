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
          <strong>{{ electronics.electronicsName }}</strong>
        </div>
        <div class="q-body-2">
          type: {{ electronics.electronicsType }}
        </div>
        <div class="q-caption">
          buy data：{{ electronics.buyDate }}
        </div>
      </div>
      <div class="col-2">
        <q-btn
          round
          size="15px"
          color="primary"
        >
          ￥{{ electronics.presentPrice }}
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
          <div> electronics type is {{ electronics.electronicsType }}</div>
          <div> public data is {{ electronics.pubDate }} </div>
        </q-tab-pane>
        <q-tab-pane name="alarms">
          <p class="caption q-body-2">
            简介: {{ electronics.des }}
          </p>
        </q-tab-pane>
        <q-tab-pane name="movies">
          <need-verify />
          <div v-if="false">
            <div>phone: {{ electronics.phone }}</div>
            <div>weixin: {{ electronics.weiXin }}</div>
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
      // 获取详细信息electronics
      electronics: {
        id: 0,
        buyDate: 0,
        electronicsName: '',
        electronicsPic: '',
        electronicsType: '',
        hasInvoice: 0,
        originalPrice: 0,
        presentPrice: 0,
        weiXin: '',
        phone: '',
        des: ''
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
      this.$axios.get('/electronics/getById/' + this.electronics.id).then(res => {
        this.electronics = res.data.page.info
        // console.log(this.electronics)
        // this.electronics.electronicsType = this.getelectronicsTypeName(this.electronics.electronicsType)
        const arr = this.electronics.electronicsPic.split(',')
        arr.forEach(item => {
          const pic = 'http://47.106.222.50:8083' + item
          this.urls.push(pic)
        })
      })
    }
  },
  created () {
    this.electronics.id = this.$route.query.id
    if ((this.electronics.id).length > 1) {
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
    height 50vh
</style>
