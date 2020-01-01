<template>
  <div class="q-pa-md">
    <form @submit.prevent.stop="onSubmit" class="q-gutter-md">
      <div class="row">
        <div class="col-9 text-center" >
          <span class="text-h5">编辑电子信息</span>
        </div>
        <div class="col-3">
          <q-btn rounded color="blue" label="发布" @click="onSubmit" />
        </div>
      </div>
      <br>

      <pic-upload :urls="JSON.stringify(urls)" @filesArr="getPicFiles"/>

      <q-input :rules="[val => val && val.length > 0 || '电子名称不能为空']"
               ref="electronicsName" prefix="名称:" type="text" value=""
               v-model="electronics.electronicsName">
        <template v-slot:prepend>
          <q-icon name="book" />
        </template>
      </q-input>

      <q-select :rules="[val => val && val.length > 0 || '电子类型不能为空']"
                v-model="electronics.electronicsType" ref="electronicsType" value=""
                :options="getElectronicsTypeNameArr" prefix="分类:"
      >
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-select>

      <q-input :rules="[val => val && val.length > 0 || '购买日期不能为空']"
               v-model="electronics.buyDate" ref="buyDate" value=""
               readonly prefix="购买日期:">
        <template v-slot:prepend>
          <q-icon name="send" />
        </template>
        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
          <date-time :max-date="maxDate" :date-string="electronics.buyDate" :is-time=false @input="setElectronicsBuyDate"/>
        </q-popup-proxy>
      </q-input>

      <q-select :rules="[val => val && val.length > 0 || '不能为空']"
                v-model="electronics.hasInvoice" ref="hasInvoice" value=""
                :options="invoiceOptions" prefix="是否有发票:">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-select>

      <q-input :rules="[ val => val > 0 && val < 1000 || '购买价格非法']"
               v-model="electronics.originalPrice" ref="originalPrice" value=""
               type="number" prefix="购买价格:" suffix="￥"
      >
        <template v-slot:prepend>
          <q-icon name="money" />
        </template>
      </q-input>

      <q-input :rules="[ val => val > 0 && val < 1000 || '出售价格非法']"
               v-model="electronics.presentPrice" ref="presentPrice" value=""
               type="number" prefix="出售价格:" suffix="￥"
      >
        <template v-slot:prepend>
          <q-icon name="money" />
        </template>
      </q-input>
      <q-input :rules="[val => val && val.length > 0 || '手机号不能为空',
               val => val.length === 11 || '手机号位数不全']"
               ref="phone" type="text" prefix="手机号:" value=""
               v-model="electronics.phone" mask="###########">
        <template v-slot:prepend>
          <q-icon name="phone" />
        </template>
      </q-input>

      <q-input :rules="[val => val && val.length > 0 || '微信号不能为空']"
               ref="weiXin" type="text" prefix="微信号:" value=""
               v-model="electronics.weiXin">
        <template v-slot:prepend>
          <q-icon name="book" />
        </template>
      </q-input>

      <q-editor v-model="electronics.des" value=""/>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { date } from 'quasar'
import NeedVerify from 'components/needVerify'
import PicUpload from 'components/picUpload'
import DateTime from 'components/dateTimeOption'
import electronics from './electronics'

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
      electronics: {
        id: 0,
        buyDate: null,
        electronicsName: null,
        electronicsPic: null,
        electronicsType: null,
        hasInvoice: null,
        originalPrice: null,
        presentPrice: null,
        phone: null,
        weiXin: null,
        des: '',
        files: [] // 上传图片
      },
      urls: [], // 上传图片
      btnFlag: false, // 发布按钮是否能点击
      options: [], // 下拉选择框
      invoiceOptions: ['没有', '有'] // 是否有发票下拉选择框
    }
  },
  created () {
    this.updateLayoutMsg({header: false, footer: false})
    this.maxDate = date.formatDate(Date.now(), 'YYYY/MM/DD')
    this.electronics.id = this.$route.query.id
    if (this.electronics.id) {
      this.updateFlag = true
      this.getElectronicsMsg()
    }
    else {
      const userMsg = JSON.parse(this.getUserDetailMsg)
      this.electronics.phone = userMsg.phone
      this.electronics.weiXin = userMsg.weiXin
    }
  },
  computed: {
    ...mapGetters('auth', ['getPageMsg', 'getUserDetailMsg']),
    ...mapGetters('staticData', ['getElectronicsTypeNameArr', 'getElectronicsTypeNumberByName'])
  },
  methods: {
    ...mapActions('auth', ['updateLayoutMsg']),
    setElectronicsBuyDate (val) {
      this.electronics.buyDate = val
      this.$refs.qDateProxy.hide()
    },
    getPicFiles (files) {
      this.electronics.files = files
    },
    async onSubmit () {
      let url = '/electronics/save'
      if (this.updateFlag) {
        url = '/electronics/update'
      }
      // 判断图片是否为空
      if (this.electronics.files.length < 1) {
        this.$q.notify('至少添加一张图片')
        return
      }
      // 判断图片是否为空
      if (this.electronics.des.length < 1) {
        this.$q.notify('描述不能为空')
        return
      }
      this.$refs.electronicsName.validate()
      this.$refs.electronicsType.validate()
      this.$refs.buyDate.validate()
      this.$refs.hasInvoice.validate()
      this.$refs.originalPrice.validate()
      this.$refs.phone.validate()
      this.$refs.weiXin.validate()
      // 校验
      if (this.$refs.electronicsName.hasError ||
        this.$refs.electronicsType.hasError ||
        this.$refs.buyDate.hasError ||
        this.$refs.hasInvoice.hasError ||
        this.$refs.originalPrice.hasError ||
        this.$refs.phone.hasError ||
        this.$refs.weiXin.hasError) {
        return
      }

      const electronicsMsg = JSON.parse(JSON.stringify(this.electronics))
      electronicsMsg.hasInvoice = this.invoiceOptions.indexOf(this.electronics.hasInvoice)
      electronicsMsg.files = this.electronics.files
      electronicsMsg.electronicsType = this.getElectronicsTypeNumberByName(electronicsMsg.electronicsType)
      try {
        this.$q.loading.show({
          message: '上传中...'
        })
        await this.$axios.post(url, electronicsMsg).then((res) => {
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
    getElectronicsMsg () {
      const electronicsMsg = JSON.parse(this.getPageMsg)
      Object.keys(this.electronics).forEach(key => {
        this.electronics[key] = electronicsMsg[key]
      })

      let aIndex = Number(this.electronics.hasInvoice)
      if (aIndex !== 0 || aIndex !== 1) {
        aIndex = 0
      }
      this.electronics.hasInvoice = this.invoiceOptions[aIndex]
      this.urls = electronicsMsg.url
    }
  },
  watch: {
    'invoiceOptions'(val) {
      console.log(val)
    }
  }
}
</script>
