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
          <strong>{{ other.otherName }}</strong>
        </div>
        <div class="q-body-2">
          售价: {{ other.presentPrice }}
        </div>
      </div>
      <div class="col-2">
        <q-btn
          round
          size="15px"
          color="primary"
        >
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
        <div> 购买日期: {{ other.buyDate }}</div>
        <div> 类型: {{ other.otherType }}</div>
        <div> 发票: {{ other.hasInvoice }} </div>
        <div> 购入价格: {{ other.originalPrice }} </div>
      </q-tab-panel>
      <q-tab-panel name="alarms">
        <p class="caption q-body-2">
          简介: {{ other.des }}
        </p>
      </q-tab-panel>
      <q-tab-panel name="movies">
        <need-verify />
        <div v-if="false">
          <div>phone: {{ other.phone }}</div>
          <div>weixin: {{ other.weiXin }}</div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import NeedVerify from 'components/needVerify'
import config from 'src/common/config'

export default {
  data () {
    return {
      slide: 0,
      tab: 'mails',
      fullscreen: false,
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
          const pic = config.picUrl + item
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
