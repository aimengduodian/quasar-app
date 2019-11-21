<template>
  <div class="q-pa-md" style="width: 100%">
    <div class="row">
      <div class="col-9 text-center" >
        <span class="text-h5">编辑辅导信息</span>
      </div>
      <div class="col-3">
        <q-btn rounded color="blue">发布</q-btn>
      </div>
    </div>
    <br>

    <q-input v-model="teach.name" type="text" prefix="名称:">
      <template v-slot:prepend>
        <q-icon name="book" />
      </template>
    </q-input>

    <q-input v-model="teach.type" type="number" prefix="类别:" suffix="选择类型">
      <template v-slot:prepend>
        <q-icon name="phone" />
      </template>
    </q-input>

    <q-input v-model="teach.startTime" mask="date" prefix="日期:">
      <template v-slot:prepend>
        <q-icon name="send" />
      </template>
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date v-model="teach.startTime" @input="() => $refs.qDateProxy.hide()" />
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
      teach: {
        id: '',
        name: '',
        type: '1', // 0：辅导  1：讲座
        price: '500',
        startTime: '2019-01-30 15:52',
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
    checkFileSize (files) {
      return files.filter(file => file.size < (2048 * 2048 * 4))
    },
    // 初始化图书类型下拉框
    initteachTypeSelect () {
      // const value = storage.getSession('teachType')
      // this.options = value.map((item) => {
      //   return item.text
      // })
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
