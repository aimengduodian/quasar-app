<template>
  <q-page class="docs-carousel">
    <div><br></div>
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
    <q-tabs animated inverted color="secondary" align="justify">
      <q-tab default name="mails" slot="title" label="简要信息" />
      <q-tab name="alarms" slot="title" label="商品描述" />
      <q-tab name="movies" slot="title" label="卖家信息" />

      <q-tab-pane name="mails">
        <div> price: ${{ coach.price }} </div>
        <div> begin time: {{ coach.startTime }}</div>
        <div> end time: {{ coach.endTime }} </div>
        <div> place: {{ coach.place }} </div>
      </q-tab-pane>
      <q-tab-pane name="alarms">
        <p v-html='coach.des'>des:</p>
      </q-tab-pane>
      <q-tab-pane name="movies">
        <div>phone: {{ coach.phone }}</div>
        <div>weixin: {{ coach.weiXin }}</div>
      </q-tab-pane>
    </q-tabs>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
export default {

  data () {
    return {
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
  methods: {
    initData () {
      this.$axios.get('/tutoring/getById/' + this.coach.id).then(res => {
        this.coach = res.data.page.info
      })
    },
    receipt () {
      this.$q.dialog({
        title: '请输入接单码',
        message: '如果没有，请联系发布者获取!',
        prompt: {
          model: '',
          type: 'text'
        },
        cancel: true,
        color: 'secondary'
      }).then(data => {
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
      }).catch((e) => {
        console.log(e)
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
  @import '~variables'

  .docs-carousel
    p.caption:not(:first-of-type)
      margin-top 38px
    .custom-caption
      text-align center
      padding 12px
      color $grey-4
      background rgba(0, 0, 0, .5)
</style>
