<template>
  <div>
    <q-toolbar class="text-white">
      <q-btn round dense flat icon="menu" @click="visible = !visible" class="q-mr-xs" />
      <q-input rounded borderless v-model="searchName" class="full-width q-ml-md" placeholder="点击搜索">
        <template v-slot:append>
          <q-icon @click="setParams" name="search" />
        </template>
      </q-input>
    </q-toolbar>
    <q-slide-transition>
      <div v-show="visible" class="bg-white">
        <div style="padding: 10px 20px">
          <div v-if="typeShowFlag">
            <q-select borderless v-model="typeName" value=""
                      :options="typeOptions" prefix="分类:"/>
            <q-separator />
          </div>
          <div v-if="InvoiceShowFlag">
            <q-select borderless v-model="optionsValue" value=""
                      :options="options" prefix="是否有发票:"/>
            <q-separator />
          </div>
          <q-input rounded borderless v-model="startPrice"
                   class="full-width col" type="number"
                   placeholder="最低" prefix="最低价格:" suffix="￥"/>
          <q-input rounded borderless v-model="endPrice"
                   class="full-width col" type="number"
                   placeholder="最高" prefix="最高价格:" suffix="￥"/>
          <div v-show="dateShowFlag">
            <q-separator />
            <q-input v-model="startTime" value="" borderless class="full-width col q-ml-md"
                     readonly prefix="开始日期:">
              <q-popup-proxy ref="qDateStartProxy" transition-show="scale" transition-hide="scale">
                <date-time :max-date="maxDate" :min-date="minDate" :is-time="timeFlag" @input="setStartTime"/>
              </q-popup-proxy>
            </q-input>
            <q-input v-model="endTime" value="" borderless class="full-width col q-ml-md"
                     readonly prefix="结束日期:">
              <q-popup-proxy ref="qDateEndProxy" transition-show="scale" transition-hide="scale">
                <date-time :max-date="maxDate" :min-date="minDate" :is-time="timeFlag" @input="setEndTime"/>
              </q-popup-proxy>
            </q-input>
          </div>
        </div>

        <div class="row">
          <q-btn flat class="col bg-grey-2 text-black" @click="reset">重置</q-btn>
          <q-btn flat class="col bg-primary" @click="setParams" >搜索</q-btn>
        </div>
      </div>
    </q-slide-transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import DateTime from 'components/dateTimeOption'
import { date } from 'quasar'

export default {
  components: {
    DateTime
  },
  data () {
    return {
      searchName: '',
      typeName: '',
      typeOptions: [],

      startPrice: '',
      endPrice: '',

      startTime: '',
      endTime: '',

      options: [],
      optionsValue: '',

      maxDate: '',
      minDate: '',

      typeShowFlag: true, // 分类是否显示
      InvoiceShowFlag: false, // 发票是否显示
      dateShowFlag: false, // 日期是否显示

      visible: false,
      timeFlag: true
    }
  },
  computed: {
    ...mapGetters('staticData', [
      'getBookTypeNameArr',
      'getBookTypeNumberByName',
      'getElectronicsTypeNameArr',
      'getElectronicsTypeNumberByName'
    ])
  },
  created () {
    this.initData()
  },
  methods: {
    ...mapActions('staticData', ['updateStaticCache']),
    ...mapActions('auth', ['updateSearchParams', 'requestUserMsg']),
    async initData () {
      await this.updateStaticCache()
      await this.requestUserMsg()
      this.typeOptions = this.getBookTypeNameArr
    },
    reset () {
      this.searchName = ''
      this.typeName = ''
      this.startPrice = ''
      this.endPrice = ''
      this.startTime = ''
      this.endTime = ''
      this.optionsValue = ''

      this.setParams()
    },
    setParams () {
      // 设置价格
      if (this.startPrice !== '' && this.endPrice !== '') {
        if (this.startPrice > this.endPrice) {
          [this.startPrice, this.endPrice] = [this.endPrice, this.startPrice]
        }
      }
      // 设置日期
      if (this.startTime !== '' && this.endTime !== '') {
        let startT = new Date(this.startTime).getTime();
        let startE = new Date(this.endTime).getTime();
        if (startT > startE) {
          [this.startTime, this.endTime] = [this.endTime, this.startTime]
        }
      }
      const params = {
        startPrice: this.startPrice,
        endPrice: this.endPrice,
        startTime: this.startTime,
        endTime: this.endTime
      }
      switch (this.$route.name) {
        case 'books':
          params.bookName = this.searchName
          if (this.typeName !== '') {
            params.bookType = this.getBookTypeNumberByName(this.typeName)
          }
          break
        case 'coach':
          params.name = this.searchName
          if (this.typeName !== '') {
            params.type = this.typeOptions.indexOf(this.typeName)
          }
          break
        case 'electronics':
          params.electronicsName = this.searchName
          if (this.typeName !== '') {
            params.electronicsType = this.getElectronicsTypeNumberByName(this.typeName)
          }
          params.hasInvoice = this.options.indexOf(this.optionsValue) === -1 ? '' : this.options.indexOf(this.optionsValue)
          break
        case 'others':
          params.otherName = this.searchName
          params.hasInvoice = this.options.indexOf(this.optionsValue) === -1 ? '' : this.options.indexOf(this.optionsValue)
          break
      }
      this.visible = false
      this.updateSearchParams(params)
    },
    setStartTime (val) {
      this.startTime = val
      this.$refs.qDateStartProxy.hide()
    },
    setEndTime (val) {
      this.endTime = val
      this.$refs.qDateEndProxy.hide()
    }
  },
  watch: {
    '$route.name' (newVal, oldVal) {
      if (newVal.indexOf(oldVal) === -1 && oldVal.indexOf(newVal) === -1) {
        this.reset()
      }
      this.visible = false
      if (newVal === 'books') {
        this.typeShowFlag = true
        this.InvoiceShowFlag = false
        this.dateShowFlag = false
        this.maxDate = date.formatDate(Date.now(), 'YYYY/MM/DD')
        this.typeOptions = this.getBookTypeNameArr
      }
      if (newVal === 'electronics') {
        this.typeShowFlag = true
        this.InvoiceShowFlag = true
        this.dateShowFlag = false
        this.maxDate = date.formatDate(Date.now(), 'YYYY/MM/DD')
        this.typeOptions = this.getElectronicsTypeNameArr
        this.options = ['没有', '有'] // 是否有发票下拉选择框
      }
      if (newVal === 'others') {
        this.typeShowFlag = false
        this.InvoiceShowFlag = true
        this.dateShowFlag = false
        this.maxDate = date.formatDate(Date.now(), 'YYYY/MM/DD')
        this.options = ['没有', '有'] // 是否有发票下拉选择框
      }
      if (newVal === 'coach') {
        this.typeShowFlag = true
        this.InvoiceShowFlag = false
        this.dateShowFlag = true
        this.maxDate = null
        this.minDate = date.formatDate(Date.now(), 'YYYY/MM/DD')
        this.typeOptions = ['辅导', '讲座']
      }
    }
  }
}
</script>
