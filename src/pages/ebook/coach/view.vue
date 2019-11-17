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
          type: {{ coach.type }}
        </div>
      </div>
      <div class="col-2">
        <q-btn round size="15px" @click="receipt()" color="primary">接单</q-btn>
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
        <div> price: ${{ coach.price }} </div>
        <div> begin time: {{ coach.startTime }}</div>
        <div> end time: {{ coach.endTime }} </div>
        <div> place: {{ coach.place }} </div>
      </q-tab-panel>
      <q-tab-panel name="alarms">
        <p v-html='coach.des'>简介:</p>
      </q-tab-panel>
      <q-tab-panel name="movies">
        <need-verify />
        <div v-if="false">
          <div>phone: {{ coach.phone }}</div>
          <div>weixin: {{ coach.weiXin }}</div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import NeedVerify from 'pages/verify/needVerify'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      tab: 'mails',
      // 获取详细信息
      coach: {
        id: 0,
        name: '',
        type: '',
        startTime: '',
        endTime: '',
        price: '20',
        isScore: 0,
        orderUser: '',
        place: '',
        updateTime: '',
        updateUser: '',
        viewTimes: '',
        weiXin: '',
        phone: '',
        des: ''
      }
    }
  },
  components: {
    NeedVerify
  },
  methods: {
    initData () {
      this.$axios.get('/tutoring/getById/' + this.coach.id).then(res => {
        this.coach = res.data.page.info
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
    }
  },
  computed: {
    ...mapGetters('auth', ['power', 'powerFlag'])
  },
  created () {
    this.coach.id = this.$route.query.id
    if ((this.coach.id).length > 1) {
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
</style>
