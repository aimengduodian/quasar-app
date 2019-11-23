<template>
  <div class="q-pa-md" style="width: 100%">
    <div class="row">
      <div class="col-9 text-center" >
        <span class="text-h5">编辑辅导信息</span>
      </div>
      <div class="col-3">
        <q-btn rounded color="blue" @click="onClickSubmit">发布</q-btn>
      </div>
    </div>
    <br>

    <q-input v-model="teach.name" type="text" prefix="名称:">
      <template v-slot:prepend>
        <q-icon name="book" />
      </template>
    </q-input>

    <q-select v-model="type" :options="options" prefix="类别:" suffix="选择类型">
      <template v-slot:prepend>
        <q-icon name="event" />
      </template>
    </q-select>

    <q-input readonly v-model="teach.startTime" prefix="开始日期:">
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date v-model="teach.startTime" mask="YYYY-MM-DD HH:mm" />
          </q-popup-proxy>
        </q-icon>
      </template>

      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-time v-model="teach.startTime" mask="YYYY-MM-DD HH:mm" format24h />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-input readonly v-model="teach.endTime" prefix="结束日期:">
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date v-model="teach.endTime" mask="YYYY-MM-DD HH:mm" />
          </q-popup-proxy>
        </q-icon>
      </template>

      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-time v-model="teach.endTime" mask="YYYY-MM-DD HH:mm" format24h />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-input v-model="teach.place" type="text" prefix="辅导地点:">
      <template v-slot:prepend>
        <q-icon name="people" />
      </template>
    </q-input>

    <q-input v-model="teach.price" type="number" prefix="薪酬:" suffix="￥">
      <template v-slot:prepend>
        <q-icon name="money" />
      </template>
    </q-input>

    <q-editor v-model="teach.des"/>
    <br>
  </div>
</template>

<script>
import NeedVerify from 'pages/verify/needVerify'

export default {
  data () {
    return {
      options: ['辅导', '讲座'],
      type: '',
      teach: {
        id: 0,
        name: '',
        type: '1', // 0：辅导  1：讲座
        price: '500',
        startTime: '2019-11-30 15:52',
        endTime: '2019-12-30 15:52',
        place: 'A栋',
        phone: 14787461136,
        weiXin: 123546,
        des: '帅气男学渣求女学霸辅导，男女搭配学习不累'
      },
      submitBtn: false
    }
  },
  methods: {
    onClickSubmit () {
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i] === this.type) {
          this.teach.type = i
          break
        }
      }
      this.$axios.post('/tutoring/save', this.teach).then((res) => {
        if (res.data.code === 100) {
          this.$q.notify(res.data.msgs.msg)
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
    },
    // 初始化图书类型下拉框
    initteachTypeSelect () {
      // const value = storage.getSession('teachType')
      // this.options = value.map((item) => {
      //   return item.text
      // })
    },
    initData () {
      // const params = JSON.parse(JSON.stringify(this.teach))
      // params.startTime = date.formatDate(params.startTime, 'X')
      // params.endTime = date.formatDate(params.endTime, 'X')
    }
  },
  components: {
    NeedVerify
  },
  created () {
    this.initteachTypeSelect()
  }
}
</script>
