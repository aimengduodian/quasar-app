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
        <div v-if="orderCodeShow" class="q-body-2">
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
      <q-tab name="movies" v-if="!getFlag" label="卖家信息" />
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
      <q-tab-panel v-if="!powerFlag" name="movies">
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
          <q-btn flat icon="book" @click="reportOrderUser">举报用户</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!--评价用户-->
    <q-dialog v-model="evaluationUser.isShow">
      <q-card style="width: 90%">
        <q-card-section>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">{{ orderUser.nickname }}</div>
          </div>
        </q-card-section>
        <q-separator/>
        <q-card-section>
          <div class="text-subtitle1"> 学号: {{ orderUser.studNo }}</div>
          <div class="text-subtitle2 text-grey"> 邮箱: {{ orderUser.email }}</div>
          <div class="text-subtitle2 text-grey"> 微信: {{ orderUser.weiXin }}</div>
        </q-card-section>
        <q-separator/>
        <q-card-section>
          <div>
            <span class="text-subtitle1"> 评分: </span>
            <q-rating v-model="evaluationUser.score" :max="5" size="32px"/>
          </div>
          <div>
            <span class="text-subtitle1"> 举报: </span>
            <q-checkbox v-model="evaluationUser.reportUserFlag"/>
          </div>
          <q-input bordered type="textarea"
                   v-if="evaluationUser.reportUserFlag"
                   float-label="在此输入建议"
                   v-model="evaluationUser.reportOrderUserMsg"
                   autogrow value=""/>
          <br>
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <q-btn :disable="evaluationUser.reportUserFlag && !evaluationUser.reportOrderUserMsg"
                 label="提交" color="primary" @click="reportOrderUser()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!--举报-->
    <report :show-dialog="showReport"
            :product="reportMsg"
            @closeDialog="showReport = false"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import common from 'src/common/common'
import NeedVerify from 'components/needVerify'
import Report from 'components/report'

export default {
  components: {
    Report,
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
      // 接单人信息
      orderUser: {
        isShow: false,
        nickname: null,
        weiXin: null,
        score: null,
        studNo: null,
        email: null
      },
      // 评价接单人
      evaluationUser: {
        isShow: false,
        score: 1, // 评分
        reportUserFlag: false,
        reportOrderUserMsg: null
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
    ...mapGetters('auth', ['power', 'getFlag', 'powerFlag']),
    orderCodeShow: function () {
      const nowDate = Date.now()
      return this.flag === 1 && this.coach.orderUser === null && nowDate < this.coach.startTime
    },
    setReceiverModel: function () {
      return [
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
    },
    setPublisherModel: function () {
      const edit = {
        show: this.flag,
        label: '编辑',
        icon: 'edit',
        color: 'primary',
        id: 'edit'
      }

      const del = {
        show: this.flag,
        label: '下架',
        icon: 'delete',
        color: 'primary',
        id: 'delete'
      }

      const evaluate = {
        show: this.orderUser,
        label: '评价',
        icon: 'person',
        color: 'primary',
        id: 'chargeOrderUser'
      }

      const orderUser = {
        show: this.orderUser,
        label: '接单人信息',
        icon: 'person',
        color: 'primary',
        id: 'orderUserMsg'
      }

      const cancelOrder = {
        show: this.orderUser,
        label: '撤销接单',
        icon: 'delete',
        color: 'primary',
        id: 'cancelOrder'
      }

      const result = []
      if (this.coach.orderUser) {
        const nowDate = Date.now()
        if (nowDate < this.coach.endTime) {
          result.push(orderUser)
          result.push(cancelOrder)
        }
        else {
          result.push(evaluate)
        }
      }
      else {
        // 没有被接单
        result.push(edit)
        result.push(del)
      }
      return result
    }
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
    async reportOrderUser () {
      const props = {
        orderUser: this.coach.orderUser,
        id: this.coach.id,
        score: this.evaluationUser.score,
        isReport: this.evaluationUser.reportUserFlag ? 1 : 0,
        des: this.evaluationUser.reportOrderUserMsg
      }
      this.$axios.post('/tutoring/updateScore', props).then(res => {
        if (Number(res.data.code) === 100) {
          this.$q.notify(res.data.msgs.msg)
          this.evaluationUser.isShow = false
        }
        else {
          this.$q.notify(res.data.msgs.msg)
        }
      })
    },
    moreMsgShow () {
      let action = []
      if (this.flag) {
        action = this.setPublisherModel
      }
      else {
        action = this.setReceiverModel
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
            this.evaluationUser.reportUserFlag = false
            break
          case 'cancelOrder':
            this.cancelOrder()
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
      this.showReport = true
      this.reportMsg = {
        productId: this.coach.id, // 产品id
        productName: this.coach.name, // 产品name
        // 产品类型 {1：图书，2：电子，3：其他, 4: coach}
        productType: 4
      }
    },
    formatCoachDate (val) {
      return common.toDate(val, 'yyyy-MM-dd HH:mm')
      // return date.formatDate(val, 'YYYY-MM-DD hh:mm')
    }
  }
}
</script>

<style lang="stylus">

</style>
