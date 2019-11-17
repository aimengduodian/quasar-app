<template>
  <div class="q-pa-md">
    <q-carousel
      animated
      v-model="slide"
      arrows
      navigation
      infinite
      :fullscreen.sync="fullscreen"
      height="150px"
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
          <strong>{{ book.bookName }}</strong>
        </div>
        <div class="q-body-2">
          author: {{ book.author }}
        </div>
        <div class="q-caption">
          出版社：{{ book.bookPub }}
        </div>
      </div>
      <div class="col-2">
        <q-btn
          round
          size="15px"
          color="primary"
        >
          ￥{{ book.bookPrice }}
        </q-btn>
      </div>
    </div>
    <br>
    <q-tabs animated inverted color="secondary" align="justify">
      <q-tab default name="mails" slot="title" label="简要信息" />
      <q-tab name="alarms" slot="title" label="商品描述" />
      <q-tab name="movies" slot="title" label="卖家信息" />

      <q-tab-panel name="mails">
        <div> book type is {{ book.bookType }}</div>
        <div> public data is {{ book.pubDate }} </div>
      </q-tab-panel>
      <q-tab-panel name="alarms">
        <p class="caption q-body-2">
          简介: {{ book.des }}
        </p>
      </q-tab-panel>
      <q-tab-panel name="movies">
        <need-verify />
        <div v-if="false">
          <div>phone: {{ book.phone }}</div>
          <div>weixin: {{ book.weiXin }}</div>
        </div>
      </q-tab-panel>
    </q-tabs>
  </div>
</template>

<script>
import NeedVerify from 'pages/verify/needVerify'

export default {
  data () {
    return {
      slide: 1,
      fullscreen: false,
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
  components: {
    NeedVerify
  },
  methods: {
    initData () {
      this.$axios.get('/book/getById/' + this.book.id).then(res => {
        this.book = res.data.page.info
        // console.log(this.book)
        // this.book.bookType = this.getBookTypeName(this.book.bookType)
        const arr = this.book.bookPic.split(',')
        arr.forEach(item => {
          const pic = 'http://47.106.222.50:8083' + item
          this.urls.push(pic)
        })
      })
    }
  },
  created () {
    this.book.id = this.$route.query.id
    if ((this.book.id).length > 1) {
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
