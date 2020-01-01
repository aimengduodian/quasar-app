<template>
  <div class="q-pa-md">
    <form @submit.prevent.stop="onSubmit" class="q-gutter-md">
      <div class="row">
        <div class="col-9 text-center" >
          <span class="text-h5">宝贝信息</span>
        </div>
        <div class="col-3">
          <q-btn rounded color="blue" label="发布" @click="onSubmit" />
        </div>
      </div>
      <br>

      <pic-upload :urls="JSON.stringify(urls)" @filesArr="getPicFiles"/>

      <q-input :rules="[val => val && val.length > 0 || '名称不能为空']"
               ref="otherName" type="text" prefix="名称:" value=""
               v-model="others.otherName">
        <template v-slot:prepend>
          <q-icon name="book" />
        </template>
      </q-input>

      <q-input :rules="[val => val && val.length > 0 || '购入时间不能为空']"
               ref="buyDate" type="text" prefix="购买时间:" value=""
               v-model="others.buyDate">
        <template v-slot:prepend>
          <q-icon name="mail" />
        </template>
        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
          <date-time :max-date="maxDate" :date-string="others.pubDate" :is-time=false @input="setOthersPubDate"/>
        </q-popup-proxy>
      </q-input>

      <q-select :rules="[val => val && val.length > 0 || '不能为空']"
                v-model="options[others.hasInvoice]" ref="hasInvoice" value=""
                :options="options" prefix="是否有发票:">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-select>

      <q-input :rules="[ val => val > 0 || '购入价格非法']"
               v-model="others.originalPrice" ref="originalPrice" value=""
               type="number" prefix="购买价格:" suffix="￥">
        <template v-slot:prepend>
          <q-icon name="money" />
        </template>
      </q-input>

      <q-input :rules="[ val => val > 0 || '出售价格非法']"
               v-model="others.presentPrice" ref="presentPrice" value=""
               type="number" prefix="出售价格:" suffix="￥">
        <template v-slot:prepend>
          <q-icon name="money" />
        </template>
      </q-input>
      <q-input :rules="[val => val && val.length > 0 || '手机号不能为空',
               val => val.length === 11 || '手机号位数不全']"
               ref="phone" type="text" prefix="手机号:" value=""
               v-model="others.phone" mask="###########">
        <template v-slot:prepend>
          <q-icon name="phone" />
        </template>
      </q-input>

      <q-input :rules="[val => val && val.length > 0 || '微信号不能为空']"
               ref="weiXin" type="text" prefix="微信号:" value=""
               v-model="others.weiXin">
        <template v-slot:prepend>
          <q-icon name="book" />
        </template>
      </q-input>

      <q-editor v-model="others.des" value=""/>
      <br>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { date } from 'quasar'
import NeedVerify from 'components/needVerify'
import PicUpload from 'components/picUpload'
import DateTime from 'components/dateTimeOption'

export default {
  components: {
    NeedVerify,
    PicUpload,
    DateTime
  },
  data () {
    return {
      maxDate: null,
      updateFlag: false,
      others: {
        id: 0,
        otherName: null,
        buyDate: null,
        originalPrice: null,
        presentPrice: null,
        hasInvoice: null,
        otherPic: null,
        phone: null,
        weiXin: null,
        des: '',
        files: [] // 上传图片
      },
      urls: [], // 上传图片
      options: ['没有', '有'],
      btnFlag: false // 发布按钮是否能点击
    }
  },
  created () {
    this.updateLayoutMsg({header: false, footer: false})
    this.others.id = this.$route.query.id
    if (this.others.id) {
      this.updateFlag = true
      this.getOthersMsg(this.others.id)
    }
    this.maxDate = date.formatDate(Date.now(), 'YYYY/MM/DD')
  },
  computed: {
    ...mapGetters('auth', ['getPageMsg'])
  },
  methods: {
    ...mapActions('auth', ['updateLayoutMsg']),
    setOthersPubDate (val) {
      this.others.buyDate = val
      this.$refs.qDateProxy.hide()
    },
    getPicFiles (files) {
      this.others.files = files
    },
    async onSubmit () {
      let url = '/other/save'
      if (this.updateFlag) {
        url = '/other/update'
      }
      // 判断图片是否为空
      if (this.others.files.length < 1) {
        this.$q.notify('至少添加一张图片')
        return
      }
      // 判断图片是否为空
      if (this.others.des.length < 1) {
        this.$q.notify('描述不能为空')
        return
      }
      this.$refs.otherName.validate()
      this.$refs.buyDate.validate()
      this.$refs.hasInvoice.validate()
      this.$refs.originalPrice.validate()
      this.$refs.presentPrice.validate()
      this.$refs.phone.validate()
      this.$refs.weiXin.validate()
      // 校验
      if (this.$refs.otherName.hasError ||
        this.$refs.buyDate.hasError ||
        this.$refs.hasInvoice.hasError ||
        this.$refs.originalPrice.hasError ||
        this.$refs.phone.hasError ||
        this.$refs.weiXin.hasError ||
        this.$refs.presentPrice.hasError) {
        return
      }

      const othersMsg = JSON.parse(JSON.stringify(this.others))
      othersMsg.hasInvoice = this.options.indexOf(this.others.hasInvoice)
      othersMsg.files = this.others.files
      try {
        this.$q.loading.show({
          message: '上传中...'
        })
        await this.$axios.post(url, othersMsg).then((res) => {
          if (res.data.code === 100) {
            this.$q.notify(res.data.msgs.msg)
          }
          else {
            this.$q.notify('Fail')
          }
          // 跳转回原页面
          this.$router.go(-1)
        })
      }
      catch (e) {
        console.log(e)
      }
      finally {
        this.$q.loading.hide()
      }
    },
    getOthersMsg () {
      const othersMsg = JSON.parse(this.getPageMsg)
      Object.keys(this.others).forEach(key => {
        this.others[key] = othersMsg[key]
      })
      this.urls = othersMsg.url
    }
  }
}
</script>
