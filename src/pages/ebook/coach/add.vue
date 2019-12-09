<template>
  <div class="q-pa-md">
    <form @submit.prevent.stop="onSubmit" class="q-gutter-md">
      <div class="row">
        <div class="col-9 text-center" >
          <span class="text-h5">编辑辅导信息</span>
        </div>
        <div class="col-3">
          <q-btn rounded color="blue" label="发布" @click="onSubmit" />
        </div>
      </div>
      <br>

      <q-input :rules="[val => val && val.length > 0 || '名称不能为空']"
               ref="name" type="text" prefix="名称:" value=""
               v-model="coach.name">
        <template v-slot:prepend>
          <q-icon name="book" />
        </template>
      </q-input>

      <q-select :rules="[val => val && val.length > 0 || '选择类型不能为空']"
                v-model="optionsValue" ref="type" value=""
                :options="options" prefix="分类:"
      >
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-select>

      <q-input :rules="[val => val && val.length > 0 || '开始日期不能为空']"
               v-model="coach.startTime" ref="startTime" value=""
               readonly prefix="开始日期:">
        <template v-slot:prepend>
          <q-icon name="send" />
        </template>
        <q-popup-proxy ref="qStartTimeProxy" transition-show="scale" transition-hide="scale">
          <date-time :min-date="minStartDateTime" :max-date="maxStartDateTime"
                     :date-string="coach.startTime" :is-time=true @input="setCoachStartTime" />
        </q-popup-proxy>
      </q-input>

      <q-input :rules="[val => val && val.length > 0 || '结束日期不能为空']"
               v-model="coach.endTime" ref="endTime" value=""
               readonly prefix="结束日期:">
        <template v-slot:prepend>
          <q-icon name="send" />
        </template>
        <q-popup-proxy ref="qEndTimeProxy" transition-show="scale" transition-hide="scale">
          <date-time :min-date="minEndDateTime" :date-string="coach.endTime"
                     :is-time=true @input="setCoachEndTime" />
        </q-popup-proxy>
      </q-input>

      <q-input :rules="[val => val && val.length > 0 || '辅导地点不能为空']"
               v-model="coach.place" ref="place" value=""
               type="text" prefix="辅导地点:">
        <template v-slot:prepend>
          <q-icon name="people" />
        </template>
      </q-input>

      <q-input :rules="[ val => val > 0 && val < 1000 || '薪酬非法']"
               v-model="coach.price" ref="price" value=""
               type="number" prefix="薪酬:" suffix="￥"
      >
        <template v-slot:prepend>
          <q-icon name="money" />
        </template>
      </q-input>

      <q-editor v-model="coach.des" value=""/>
      <br>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { date } from 'quasar'
import NeedVerify from 'components/needVerify'
import DateTime from 'components/dateTimeOption'

export default {
  components: {
    NeedVerify,
    DateTime
  },
  data () {
    return {
      minStartDateTime: null,
      updateFlag: false,
      coach: {
        name: null, // 辅导名称
        type: null, // 辅导类型{0：辅导，1：讲座}
        price: null, // 辅导价格
        startTime: null, // 开始时间
        endTime: null, // 结束时间
        place: null, // 讲座地点
        weiXin: null, // 微信
        phone: null, // 手机号
        des: '' // 描述
      },
      optionsValue: '',
      options: ['辅导', '讲座']
    }
  },
  created () {
    this.coach.id = this.$route.query.id
    if (this.coach.id) {
      this.updateFlag = true
      this.getCoachMsg()
    }
    this.minStartDateTime = date.formatDate(Date.now(), 'YYYY/MM/DD')
  },
  computed: {
    ...mapGetters('auth', ['getPageMsg']),
    minEndDateTime: function () {
      const startTime = this.coach.startTime || Date.now()
      return date.formatDate(startTime, 'YYYY/MM/DD')
    },
    maxStartDateTime: function () {
      const endTime = this.coach.endTime || Date.now()
      return date.formatDate(endTime, 'YYYY/MM/DD')
    }
  },
  methods: {
    setCoachStartTime (val) {
      this.coach.startTime = val
      this.$refs.qStartTimeProxy.hide()
    },
    setCoachEndTime (val) {
      this.coach.endTime = val
      this.$refs.qEndTimeProxy.hide()
    },
    async onSubmit () {
      let url = '/tutoring/save'
      if (this.updateFlag) {
        url = '/tutoring/update'
      }
      // 判断图片是否为空
      if (this.coach.des.length < 1) {
        this.$q.notify('描述不能为空')
        return
      }
      this.$refs.name.validate()
      this.$refs.type.validate()
      this.$refs.startTime.validate()
      this.$refs.endTime.validate()
      this.$refs.place.validate()
      // 校验
      if (this.$refs.name.hasError ||
        this.$refs.type.hasError ||
        this.$refs.startTime.hasError ||
        this.$refs.endTime.hasError ||
        this.$refs.place.hasError) {
        return
      }

      const coachMsg = JSON.parse(JSON.stringify(this.coach))
      coachMsg.type = this.options.indexOf(this.optionsValue)
      try {
        this.$q.loading.show({
          message: '上传中...'
        })
        await this.$axios.post(url, coachMsg).then((res) => {
          if (res.data.code === 100) {
            this.$q.notify(res.data.msgs.msg)
            // 跳转回原页面
            this.$router.go(-1)
          }
          else if (res.data.code === 200) {
            let msg = ''
            Object.keys(res.data.page.errors).forEach(key => {
              msg = msg + key + res.data.page.errors[key]
            })
            this.$q.notify(msg)
          }
          else {
            this.$q.notify('未知错误')
          }
        })
      }
      catch (e) {
        console.log(e)
      }
      finally {
        this.$q.loading.hide()
      }
    },
    getCoachMsg () {
      const coachMsg = JSON.parse(this.getPageMsg)
      Object.keys(this.coach).forEach(key => {
        this.coach[key] = coachMsg[key]
      })
      this.optionsValue = this.options[coachMsg.type] || this.options[0]
    }
  }
}
</script>
