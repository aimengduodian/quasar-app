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
                      :options="typeOptions" prefix="分类:">
            </q-select>
            <q-separator />
          </div>
          <div v-if="InvoiceShowFlag">
            <q-select borderless v-model="optionsValue" value=""
                      :options="options" prefix="是否有发票:">
            </q-select>
            <q-separator />
          </div>
          <q-input rounded borderless v-model="startPrice"
                   class="full-width col" type="number"
                   placeholder="最低" prefix="最低价格:" suffix="￥">
          </q-input>
          <q-input rounded borderless v-model="endPrice"
                   class="full-width col" type="number"
                   placeholder="最高" prefix="最高价格:" suffix="￥">
          </q-input>
          <q-separator />
          <q-input v-model="startTime" value="" borderless class="full-width col"
                   readonly prefix="开始日期:">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <date-time :max-date="maxDate" :is-time="timeFlag" @input="setStartTime"/>
            </q-popup-proxy>
          </q-input>
          <q-input v-model="endTime" value="" borderless class="full-width col q-ml-md"
                   readonly prefix="结束日期:">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <date-time :min-date="minDate" :is-time="timeFlag" @input="setEndTime"/>
            </q-popup-proxy>
          </q-input>
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

export default {
  components: {
    DateTime
  },
  props: {
  },
  data() {
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

      typeShowFlag: false,
      InvoiceShowFlag: false,

      visible: false,
      timeFlag: false
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
  methods: {
    ...mapActions('auth', ['updateSearchParams']),
    reset () {
      this.searchName = ''
      this.typeName = ''
      this.startPrice = ''
      this.endPrice = ''
      this.startTime = ''
      this.endTime = ''
      this.optionsValue = ''
    },
    setParams() {
      const params = {
        startPrice: this.startPrice,
        endPrice: this.endPrice,
        startTime: this.startTime,
        endTime: this.endTime
      }
      switch (this.$route.name) {
        case 'books':
          params.bookName = this.searchName
          if(this.typeName !== ''){
            params.bookType = this.getBookTypeNumberByName(this.typeName)
          }
          break
        case 'coach':
          params.name = this.searchName
          if(this.typeName !== '') {
            params.type = this.typeOptions.indexOf(this.typeName)
          }
          break
        case 'electronics':
          params.electronicsName = this.searchName
          if(this.typeName !== '') {
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
      this.$refs.qDateProxy.hide()
    },
    setEndTime (val) {
      this.endTime = val
      this.$refs.qDateProxy.hide()
    }
  },
  watch: {
    '$route.name' (val) {
      this.visible = false
      this.reset()
      if (val === 'books') {
        this.typeShowFlag = true
        this.InvoiceShowFlag = false
        this.typeOptions = this.getBookTypeNameArr
      }
      if (val === 'electronics') {
        this.typeShowFlag = true
        this.InvoiceShowFlag = true
        this.typeOptions = this.getElectronicsTypeNameArr
        this.options = ['没有', '有'] // 是否有发票下拉选择框
      }
      if (val === 'others') {
        this.typeShowFlag = false
        this.InvoiceShowFlag = true
        this.options = ['没有', '有'] // 是否有发票下拉选择框
      }
      if (val === 'coach') {
        this.typeShowFlag = true
        this.InvoiceShowFlag = false
        this.typeOptions = ['辅导', '讲座']
      }
      console.log(val)
    }
  }
}
</script>
