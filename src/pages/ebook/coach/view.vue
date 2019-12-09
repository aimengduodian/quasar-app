<template>
  <div class="q-pa-md">
    <div class="row justify-around">
      <div class="col-3">
        <img style="border-radius: 10px; width: 80%"
             src="statics/boy-avatar.png"
             alt="head picture">
      </div>
      <div class="col-5">
        <div class="q-title">
          <strong>{{ coach.name }}</strong>
        </div>
        <div class="q-body-2">
          类型: {{ typeOptions[coach.type] }}
        </div>
        <div v-if="flag" class="q-body-2">
          接单码: {{ coach.checkCode }}
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
        <div> 报酬: ￥{{ coach.price }} </div>
        <div> 开始时间: {{ formatCoachDate(coach.startTime) }}</div>
        <div> 结束时间: {{ formatCoachDate(coach.endTime) }} </div>
        <div> 地点: {{ coach.place }} </div>
      </q-tab-panel>
      <q-tab-panel name="alarms">
        <p class="caption q-body-2" v-html='coach.des' />
      </q-tab-panel>
      <q-tab-panel v-if="!flag" name="movies">
        <need-verify />
        <div v-if="false">
          <div>电话: {{ coach.phone }}</div>
          <div>微信: {{ coach.weiXin }}</div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
    <!--举报-->
    <report :show-dialog="showReport"
            :product="reportMsg"
            @closeDialog="showReport = false"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { date } from 'quasar'
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
      // 获取详细信息
      coach: {
        id: 0,
        name: null,
        type: null,
        startTime: null,
        endTime: null,
        price: null,
        isScore: null,
        orderUser: null,
        place: null,
        updateTime: null,
        updateUser: null,
        viewTimes: null,
        weiXin: null,
        phone: null,
        des: '',
        checkCode: null // 接单码
      },
      typeOptions: ['辅导', '讲座']
    }
  },
  created () {
    this.coach.id = this.$route.query.id
    if ((this.coach.id).length > 1) {
      this.initData()
    }
    else {
      this.$q.notify('[error]选择的物品id为0，请检查物品id是否正确!')
    }
  },
  computed: {
    ...mapState('auth', ['flag']),
    ...mapGetters('auth', ['power', 'powerFlag'])
  },
  methods: {
    ...mapActions('auth', ['updatePageMsg']),
    initData () {
      this.$axios.get('/tutoring/getById/' + this.coach.id).then(res => {
        this.coach = res.data.page.info
        const pageMsg = JSON.parse(JSON.stringify(this.coach))
        // pageMsg.pubDate = this.formatCoachDate(pageMsg.pubDate)
        this.updatePageMsg(pageMsg)
      })
    },
    receipt () {
      // ‘其他’类型
      this.$q.dialog({
        title: '请输入接单码',
        message: '如果没有，请联系发布者获取!',
        prompt: {
          model: '',
          type: 'text' // optional
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
        this.$axios.post('/tutoring/getOrder', {
          id: this.coach.id,
          checkCode: data
        }).then(res => {
          switch (Number(res.data.code)) {
            case 100:
              this.$q.notify(res.data.page.msg)
              this.$router.go(-1)
              break
            case 101:
              // 没有学生认证，跳转到学生认证
              this.$router.push({ name: 'verify' })
              break
            default:
              this.$q.notify(res.data.page.msg)
          }
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    moreMsgShow () {
      const report = [
        {
          label: '接单',
          icon: 'money',
          id: 'gift'
        },
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

      const action = []
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
            this.reportOrder()
            break
          case 'edit':
            this.editCoach()
            break
          case 'delete':
            this.deleteCoach()
            break
          case 'gift':
            this.receipt()
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
    editCoach () {
      const item = {
        name: 'books_add',
        query: {
          id: this.book.id
        }
      }
      this.$router.push(item)
    },
    deleteCoach () {
      this.$q.dialog({
        title: '确认下架？',
        message: '下架后可在我的界面重新发布!',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.post('/tutoring/delete', {
          id: this.coach.id
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
    reportOrder () {
      this.$q.notify('点击年举报')
      this.showReport = true
      this.reportMsg = {
        productId: this.coach.id, // 产品id
        productName: this.coach.name, // 产品name
        // 产品类型 {1：图书，2：电子，3：其他}
        productType: 1
      }
    },
    formatCoachDate (val) {
      return date.formatDate(val, 'YYYY-MM-DD hh:mm')
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
</style>
