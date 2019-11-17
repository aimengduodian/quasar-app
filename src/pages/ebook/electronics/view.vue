<template>
  <div class="q-pa-md">
    <q-carousel
      swipeable
      animated
      v-model="slide"
      thumbnails
      infinite
      :fullscreen.sync="fullscreen"
      height="180px"
      autoplay
    >
      <q-carousel-slide v-for="(item, index) in urls"
                        :key="index" :name="index"
                        :img-src="item"/>
      <template v-slot:control>
        <q-carousel-control
          position="bottom-right"
          :offset="[18, 18]"
        >
          <q-btn
            flat round dense color="white" text-color="primary"
            :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="fullscreen = !fullscreen"
          />
        </q-carousel-control>
      </template>
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
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="mails" label="简要信息" />
      <q-tab name="alarms" label="商品描述" />
      <q-tab name="movies" label="卖家信息" />
    </q-tabs>
    <q-separator />
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="mails">
        <div> electronics type is {{ electronics.electronicsType }}</div>
        <div> public data is {{ electronics.pubDate }} </div>
      </q-tab-panel>
      <q-tab-panel name="alarms">
        <p class="caption q-body-2">
          简介: {{ electronics.des }}
        </p>
      </q-tab-panel>
      <q-tab-panel name="movies">
        <need-verify />
        <div v-if="false">
          <div>phone: {{ electronics.phone }}</div>
          <div>weixin: {{ electronics.weiXin }}</div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import NeedVerify from 'pages/verify/needVerify'

export default {
  data () {
    return {
      tab: 'mails',
      slide: 0,
      fullscreen: false,
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
