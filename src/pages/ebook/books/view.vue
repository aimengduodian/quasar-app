<template>
  <div>
    <q-carousel
      swipeable
      animated
      v-model="slide"
      thumbnails
      infinite
      :fullscreen.sync="fullscreen"
      height="180px"
    >
      <q-carousel-slide v-for="(item, index) in urls"
                        :key="index" :name="index"
                        :img-src="item"/>
      <template v-slot:control>
        <q-carousel-control
          position="top-right"
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
    <div class="q-pa-md">
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
            作者: {{ book.author }}
          </div>
          <div class="q-caption">
            出版社：{{ book.bookPub }}
          </div>
        </div>
        <div class="col-2">
          <q-btn flat text-color="primary" icon="more"
                 @click="moreMsgShow(true)" />
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
        <q-tab name="movies" v-if="!flag" label="卖家信息" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="mails">
          <div v-if="!flag"> 出售价格: ￥{{ book.bookPrice }} </div>
          <div> 类型: {{ getBookTypeNameByNumber(book.bookType) }}</div>
          <div> 出版日期: {{ formatBookDate(book.pubDate) }} </div>
        </q-tab-panel>
        <q-tab-panel name="alarms">
          <p class="caption q-body-2" v-html="book.des" />
        </q-tab-panel>
        <q-tab-panel v-if="!flag" name="movies">
          <need-verify />
          <div v-if="false">
            <div>电话: {{ book.phone }}</div>
            <div>微信: {{ book.weiXin }}</div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
      <!--举报-->
      <report :show-dialog="showReport"
              :product="reportMsg"
              @closeDialog="showReport = false"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { date } from 'quasar'
import config from 'src/common/config'
import NeedVerify from 'components/needVerify'
import Report from 'components/report'

export default {
  components: {
    NeedVerify,
    Report
  },
  data () {
    return {
      showReport: false,
      reportMsg: null,
      tab: 'mails',
      slide: 0,
      fullscreen: false,
      // 获取详细信息
      book: {
        id: 0,
        bookName: null,
        bookType: null,
        author: null,
        bookPrice: null,
        pubDate: null,
        bookPub: null,
        bookPic: null,
        weiXin: null,
        phone: null,
        des: null,
        viewTimes: null
      },
      // 图片地址轮播
      urls: []
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
  },
  computed: {
    ...mapState('auth', ['flag']),
    ...mapGetters('auth', ['power', 'powerFlag']),
    ...mapGetters('staticData', ['getBookTypeNameByNumber'])
  },
  methods: {
    ...mapActions('auth', ['updatePageMsg']),
    initData () {
      this.$axios.get('/book/getById/' + this.book.id).then(res => {
        this.book = res.data.page.info
        const arr = this.book.bookPic.split(',')
        arr.forEach(item => {
          const pic = config.picUrl + item
          this.urls.push(pic)
        })
        const pageMsg = JSON.parse(JSON.stringify(this.book))
        pageMsg.pubDate = this.formatBookDate(pageMsg.pubDate)
        pageMsg.bookType = this.getBookTypeNameByNumber(pageMsg.bookType)
        pageMsg.url = JSON.parse(JSON.stringify(this.urls))
        this.updatePageMsg(pageMsg)
      })
    },
    moreMsgShow () {
      const report = [
        {
          show: !this.flag,
          label: '举报',
          icon: 'report',
          id: 'report'
        }
      ]
      const seller = [
        {
          show: this.flag,
          label: '编辑',
          icon: 'edit',
          color: 'primary',
          id: 'edit'
        },
        {
          show: this.flag,
          label: '下架',
          icon: 'delete',
          color: 'primary',
          id: 'delete'
        }
      ]
      const action = [
        {},
        {
          label: '分享',
          icon: 'share',
          id: 'share'
        }
      ]
      if (this.flag) {
        seller.forEach(item => {
          action.unshift(item)
        })
      }
      else {
        report.forEach(item => {
          action.push(item)
        })
      }

      this.$q.bottomSheet({
        message: '更多',
        grid: false,
        actions: action
      }).onOk(action => {
        switch (action.id) {
          case 'report':
            this.reportBook()
            break
          case 'edit':
            this.editBook()
            break
          case 'delete':
            this.deleteBook()
            break
          case 'share':
            this.shareBook()
            break
          default:
            break
        }
      }).onCancel(() => {
        // console.log('Dismissed')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    editBook () {
      const item = {
        name: 'books_add',
        query: {
          id: this.book.id
        }
      }
      this.$router.push(item)
    },
    deleteBook () {
      this.$q.dialog({
        title: '确认下架？',
        message: '下架后可在我的界面重新发布!',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.post('/book/delete', {
          id: this.book.id
        }).then((res) => {
          if (res.data.code === 100) {
            this.$q.notify('删除成功')
            // 跳转回原页面
            this.$router.go(-1)
          }
          else {
            this.$q.notify('失败')
          }
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    reportBook () {
      this.showReport = true
      this.reportMsg = {
        productId: this.book.id, // 产品id
        productName: this.book.bookName, // 产品name
        // 产品类型 {1：图书，2：电子，3：其他}
        productType: 1
      }
    },
    shareBook () {
      this.$q.notify('点击了分享')
    },
    formatBookDate (val) {
      return date.formatDate(val, 'YYYY-MM-DD')
    }
  }
}
</script>
