<template>
  <div>
    <img v-gallery ref="bigImg" :src="urls[slide] || ''"
         style="position: fixed; margin-top: -1000px" alt="" >
    <q-carousel
      swipeable
      animated
      v-model="slide"
      thumbnails
      infinite
      height="180px"
      autoplay
    >
      <q-carousel-slide v-for="(item, index) in urls"
                        @click="$refs.bigImg.click()"
                        :key="index" :name="index"
                        :img-src="item"/>
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
            <strong>{{ other.otherName }}</strong>
          </div>
          <div class="q-body-2">
            售价: ￥ {{ other.presentPrice }}
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
        <q-tab name="movies" label="卖家信息" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="mails">
          <div> 购买日期: {{ formatOtherDate(other.buyDate) }}</div>
          <div> 发票: {{ other.hasInvoice ? '有' : '没有' }} </div>
          <div> 购入价格: ￥{{ other.originalPrice }}</div>
        </q-tab-panel>
        <q-tab-panel name="alarms">
          <p class="caption q-body-2" v-html="other.des" />
        </q-tab-panel>
        <q-tab-panel name="movies">
          <need-verify v-if="needVerify" />
          <div v-if="false">
            <div>电话: {{ other.phone }}</div>
            <div>微信: {{ other.weiXin }}</div>
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
import { mapActions, mapGetters } from 'vuex'
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
      other: {
        id: 0,
        buyDate: null,
        createTime: null,
        otherName: null,
        hasInvoice: null,
        presentPrice: null,
        originalPrice: null,
        otherPic: null,
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
    this.other.id = this.$route.query.id
    if ((this.other.id).length > 1) {
      this.initData()
    }
    else {
      this.$q.notify('[error]选择的物品id为0，请检查物品id是否正确!')
    }
  },
  computed: {
    ...mapGetters('auth', [ 'getFlag', 'needVerify'])
  },
  methods: {
    ...mapActions('auth', ['updatePageMsg']),
    initData () {
      this.$axios.get('/other/getById/' + this.other.id).then(res => {
        this.other = res.data.page.info
        const arr = this.other.otherPic.split(',')
        arr.forEach(item => {
          const pic = config.picUrl + item
          this.urls.push(pic)
        })
        const pageMsg = JSON.parse(JSON.stringify(this.other))
        pageMsg.buyDate = this.formatOtherDate(pageMsg.buyDate)
        pageMsg.url = JSON.parse(JSON.stringify(this.urls))
        this.updatePageMsg(pageMsg)
      })
    },
    moreMsgShow () {
      const report = [
        {
          show: !this.getFlag,
          label: '举报',
          icon: 'report',
          id: 'report'
        }
      ]
      const seller = [
        {
          show: this.getFlag,
          label: '编辑',
          icon: 'edit',
          color: 'primary',
          id: 'edit'
        },
        {
          show: this.getFlag,
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
      if (this.getFlag) {
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
            this.reportOther()
            break
          case 'edit':
            this.editOther()
            break
          case 'delete':
            this.deleteOther()
            break
          case 'share':
            this.shareOther()
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
    editOther () {
      const item = {
        name: 'others_add',
        query: {
          id: this.other.id
        }
      }
      this.$router.push(item)
    },
    deleteOther () {
      this.$q.dialog({
        title: '确认下架？',
        message: '下架后可在我的界面重新发布!',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.post('/other/delete', {
          id: this.other.id
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
    reportOther () {
      this.showReport = true
      this.reportMsg = {
        productId: this.other.id, // 产品id
        productName: this.other.otherName, // 产品name
        // 产品类型 {1：图书，2：电子，3：其他}
        productType: 3
      }
    },
    shareOther () {
      this.$q.notify('点击了分享')
    },
    formatOtherDate (val) {
      return date.formatDate(val, 'YYYY-MM-DD')
    }
  }
}
</script>
