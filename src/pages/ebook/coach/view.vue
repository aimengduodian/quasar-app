<template>
  <div class="q-pa-md">
    <div class="row justify-around">
      <div class="col-3">
        <img style="border-radius: 10px; width: 80%"
             src="statics/boy-avatar.png"
             alt="head picture">
      </div>
      <div class="col-5" v-if="coach.orderUser"
           style="background: url('statics/bg.jpg') center no-repeat">
        <div class="q-title">
          <strong>{{ coach.name }}</strong>
        </div>
        <div class="q-body-2">
          类型: {{ typeOptions[coach.type] }}
        </div>
      </div>
      <div class="col-5" v-else>
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
        <p class="caption q-body-2" v-html='coach.des'/>
      </q-tab-panel>
      <q-tab-panel v-if="!flag" name="movies">
        <need-verify />
        <div v-if="false">
          <div>电话: {{ coach.phone }}</div>
          <div>微信: {{ coach.weiXin }}</div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
    <!--接单人信息-->
    <q-dialog v-model="orderUser.isShow">
      <q-card>
        <img src="~assets/donuts.png" alt="" >
        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="place"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">{{ orderUser.nickname }}</div>
            <div class="col-auto text-grey q-pt-md">
              <q-icon name="place" /> 250 ft
            </div>
          </div>

          <q-rating v-model="orderUser.score" :max="5" size="32px" readonly />
        </q-card-section>

        <q-card-section>
          <div class="text-subtitle1"> 学号: {{ orderUser.studNo }}</div>
          <div class="text-subtitle2 text-grey"> 邮箱: {{ orderUser.email }} </div>
          <div class="text-subtitle2 text-grey"> 微信: {{ orderUser.weiXin }} </div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat icon="book" @click="reportEvaluationUser">举报用户</q-btn>
          <q-btn flat color="primary" @click="cancelOrder">撤销接单</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!--评价用户-->
    <q-dialog v-model="evaluationUser.isShow">
      <q-card>
        <img src="~assets/donuts.png" alt="" >
        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">{{ orderUser.nickname }}</div>
          </div>
        </q-card-section>

        <q-card-section>
          <div class="text-subtitle1"> 学号: {{ orderUser.studNo }}</div>
          <div class="text-subtitle2 text-grey"> 邮箱: {{ orderUser.email }} </div>
          <div class="text-subtitle2 text-grey"> 微信: {{ orderUser.weiXin }} </div>
        </q-card-section>

        <q-card-section>
          <q-rating v-model="evaluationUser.score" :max="5" size="32px" />
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-icon name="book" />
          <q-btn flat color="primary" @click="reportUser">submit</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { date } from 'quasar'
import NeedVerify from 'components/needVerify'

export default {
  components: {
    NeedVerify
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
      typeOptions: ['辅导', '讲座'],
      // 接单人
      orderUser: {
        isShow: false,
        nickname: null,
        weiXin: null,
        score: null,
        studNo: null,
        email: null
      },
      // 接单人
      evaluationUser: {
        isShow: false,
        score: 0 // 评分
      }
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
        if (this.coach.orderUser) {
          this.getOrderUserMsg()
        }
        const pageMsg = JSON.parse(JSON.stringify(this.coach))
        pageMsg.startTime = this.formatCoachDate(pageMsg.startTime)
        pageMsg.endTime = this.formatCoachDate(pageMsg.endTime)
        this.updatePageMsg(pageMsg)
      })
    },
    async getOrderUserMsg () {
      await this.$axios.get('/user/getById/' + this.coach.orderUser).then(res => {
        if (Number(res.data.code) === 200) {
          this.$q.notify('......')
        }
        else {
          this.orderUser.nickname = res.data.page.info.nickname
          this.orderUser.weiXin = res.data.page.info.weiXin
          this.orderUser.studNo = res.data.page.info.studNo
          this.orderUser.score = res.data.page.info.score / 2
          this.orderUser.email = res.data.page.info.email
        }
      })
    },
    async cancelOrder () {
      this.$q.dialog({
        title: '撤销接单',
        message: '确定要撤销接单吗?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.post('/tutoring/delOrder', { id: this.coach.id }).then(res => {
          if (res.data.code === 100) {
            this.orderUser.isShow = false
            this.coach.orderUser = null
          }
          this.$q.notify(res.data.msgs.msg)
        })
      })
    },
    async receipt () {
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
    async reportEvaluationUser () {
      this.$q.dialog({
        title: '举报接单人',
        message: '请输入举报原因!',
        prompt: {
          model: '',
          type: 'text' // optional
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
        if (date === '') {
          this.$q.notify('请填写举报原因')
          return
        }
        const props = {
          orderUser: this.coach.orderUser,
          id: this.coach.id,
          score: 1,
          flag: 1,
          des: data
        }
        this.$axios.post('/tutoring/updateScore', props).then(res => {
          if (Number(res.data.code) === 200) {
            this.$q.notify(res.data.msgs.msg)
          }
          else {
            this.$q.notify(res.data.msgs.msg)
          }
        })
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
      if (this.coach.orderUser) {
        const nowDate = Date.now()
        if (nowDate > this.coach.endTime) {
          seller.push(
            {
              show: this.orderUser,
              label: '评价',
              icon: 'person',
              color: 'primary',
              id: 'chargeOrderUser'
            }
          )
        }
        else {
          seller.push(
            {
              show: this.orderUser,
              label: '接单人信息',
              icon: 'person',
              color: 'primary',
              id: 'orderUserMsg'
            }
          )
        }
      }
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
          case 'orderUserMsg':
            this.orderUser.isShow = true
            break
          case 'chargeOrderUser':
            this.evaluationUser.isShow = true
            break
          default:
            break
        }
      })
    },
    editCoach () {
      const item = {
        name: 'coach_add',
        query: {
          id: this.coach.id
        }
      }
      this.$router.push(item)
    },
    async deleteCoach () {
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
    // 举报产品
    reportOrder () {
      this.$q.notify('点击举报')
      this.showReport = true
      this.reportMsg = {
        productId: this.coach.id, // 产品id
        productName: this.coach.name, // 产品name
        // 产品类型 {1：图书，2：电子，3：其他, 4: coach}
        productType: 4
      }
    },
    // 举报接单人
    async reportUser () {
      const props = {
        orderUser: this.coach.orderUser,
        id: this.coach.id,
        score: this.evaluationUser.score,
        flag: 0,
        des: ''
      }
      await this.$axios.post('/tutoring/updateScore', props).then(res => {
        if (Number(res.data.code) === 200) {
          this.$q.notify(res.data.msgs.msg)
        }
        else {
          this.$q.notify(res.data.msgs.msg)
        }
        this.evaluationUser.isShow = false
      })
    },
    formatCoachDate (val) {
      return date.formatDate(val, 'YYYY-MM-DD hh:mm')
    }
  }
}
</script>

<style lang="stylus">

</style>
