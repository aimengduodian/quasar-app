<template>
  <div class="q-pa-md" style="width: 100%">
    <div class="row">
      <div class="col-9 text-center" >
        <span class="text-h5">编辑图书信息</span>
      </div>
      <div class="col-3">
        <q-btn rounded color="blue" @click="onClickSubmit">发布</q-btn>
      </div>
    </div>
    <br>

    <q-uploader
      label="上传图片"
      multiple
      accept=".jpg, image/*"
      :filter="checkFile"
      style="width: 100%"
    />

    <q-input v-model="book.bookName" type="text" prefix="名称:">
      <template v-slot:prepend>
        <q-icon name="book" />
      </template>
    </q-input>

    <q-input v-model="book.author" type="text" prefix="作者:">
      <template v-slot:prepend>
        <q-icon name="people" />
      </template>
    </q-input>

    <q-input v-model="book.bookType" type="number" prefix="分类:" suffix="选择类型">
      <template v-slot:prepend>
        <q-icon name="phone" />
      </template>
    </q-input>

    <q-input v-model="book.bookPub" type="text" prefix="出版社:">
      <template v-slot:prepend>
        <q-icon name="mail" />
      </template>
    </q-input>

    <q-input v-model="book.pubDate" mask="date" prefix="出版日期:">
      <template v-slot:prepend>
        <q-icon name="send" />
      </template>
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date v-model="book.pubDate" @input="() => $refs.qDateProxy.hide()" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-input v-model="book.bookPrice" type="number" prefix="出售价格:" suffix="￥">
      <template v-slot:prepend>
        <q-icon name="money" />
      </template>
    </q-input>
    <br>
    <q-editor v-model="book.des"/>
    <br>
  </div>
</template>

<script>
import NeedVerify from 'pages/verify/needVerify'
import picUpload from 'components/picUpload'

export default {
  data () {
    return {
      book: {
        id: 0,
        bookName: null,
        bookType: null,
        author: null,
        bookPrice: null,
        pubDate: null,
        bookPub: null,
        bookPic: null,
        des: ''
      },
      options: [], // 下拉选择框
      urls: [], // 上传图片
      btnFlag: false // 发布按钮是否能点击
    }
  },
  methods: {
    checkFile (files) {
      return files.filter(file => file.size < 2048 * 2048 * 4)
    },
    onClickSubmit () {
      console.log(this.urls)
    },
    // 初始化图书类型下拉框
    initBookTypeSelect () {
      // const value = storage.getSession('bookType')
      // this.options = value.map((item) => {
      //   return item.text
      // })
    }
  },
  components: {
    NeedVerify,
    picUpload
  },
  created () {
    this.initBookTypeSelect()
  }
}
</script>
