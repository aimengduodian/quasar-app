<template>
  <q-page padding class="docs-input row justify-center">
    <br>
    <div class="row">
      <div class="col-9 text-center" >
        <span>编辑图书信息</span>
      </div>
      <div class="col-3">
        <q-btn rounded icon="mail" color="blue">发布</q-btn>
      </div>
    </div>
    <br>
    <div style="margin: 10px 20px; width: 100%">
      <q-item>
        <q-item-side icon="monetization_on" />
        <q-input v-model="num"
                 type="text"
                 placeholder="输入名称"
        />
      </q-item>
      <q-list-header>Begin Date & Time</q-list-header>
      <q-item>
        <q-item-side icon="notifications" />
        <q-item-main>
          <q-datetime class="no-margin"
                      v-model="t3" type="datetime" />
        </q-item-main>
      </q-item>
    </div>

    <div style="margin: 10px 20px">
      <q-list-header>Begin Date & Time</q-list-header>
      <q-item>
        <q-item-side icon="notifications" />
        <q-item-main>
          <q-datetime class="no-margin" v-model="t3" type="datetime" />
        </q-item-main>
      </q-item>
      <q-list-header>End Date & Time</q-list-header>
      <q-item>
        <q-item-side icon="notifications" />
        <q-item-main>
          <q-datetime class="no-margin" v-model="t3" type="datetime" />
        </q-item-main>
      </q-item>
      <q-input v-model="num"
               type="number"
               placeholder="出版日期"
               suffix="开个价"
               :before="[{icon: 'monetization_on', handler () {}}]"
      />
    </div>
    <q-datetime-picker v-model="model" type="date" />
    <div style="margin: 10px 20px">
      <q-input v-model="num"
               type="number"
               placeholder="输入价格"
               suffix="开个价"
               :before="[{icon: 'monetization_on', handler () {}}]"
      />
    </div>

  </q-page>
</template>

<script>
import NeedVerify from 'pages/verify/needVerify'
// const today = new Date()
// const { startOfDate, addToDate, subtractFromDate } = date

export default {
  data () {
    return {
      // 获取详细信息
      model: null,
      num: null,
      t1: null,
      t2: null,
      t3: null,
      date1: null,
      date2: null,
      date3: null,
      date4: null,
      date5: null,
      date6: null,
      date7: null,
      date8: null,
      date9: null,
      date10: null,
      lazy: null,

      error: true,
      warning: false,
      // today,
      // tomorrow: addToDate(today, { days: 1 }),
      // yesterday: subtractFromDate(today, { days: 1 }),
      // defaultValue: startOfDate(today, 'year')
    }
  },
  components: {
    NeedVerify
  },
  methods: {
    initData () {
    }
  },
  created () {
  }
}
</script>

<style lang="stylus">
  @import '~variables'

  .docs-input
    .q-if, .q-field, .q-uploader
      margin 16px 0
    .q-field, .q-uploader
      .q-if
        margin 0
    .q-field .q-uploader
      margin 0
    .caption:not(:first-child)
      margin-top 40px
    .dark-example
      padding 5px 15px 15px
      box-shadow $shadow-2
      border-radius 2px

</style>
