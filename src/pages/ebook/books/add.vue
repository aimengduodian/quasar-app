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
      label="上传图片，图片大小不能超过4M"
      multiple
      hide-upload-btn
      accept=".jpg, image/*"
      :filter="checkFile"
      @added="addImage"
      @removed="reImage"
      style="width: 100%"
    />

    <q-input value="" v-model="book.bookName" type="text" prefix="名称:">
      <template v-slot:prepend>
        <q-icon name="book" />
      </template>
    </q-input>

    <q-input value="" v-model="book.author" type="text" prefix="作者:">
      <template v-slot:prepend>
        <q-icon name="people" />
      </template>
    </q-input>

    <q-input value="" v-model="book.bookType" type="number" prefix="分类:" suffix="选择类型">
      <template v-slot:prepend>
        <q-icon name="phone" />
      </template>
    </q-input>

    <q-input value="" v-model="book.bookPub" type="text" prefix="出版社:">
      <template v-slot:prepend>
        <q-icon name="mail" />
      </template>
    </q-input>

    <q-input value="" v-model="book.pubDate" prefix="出版日期:">
      <template v-slot:prepend>
        <q-icon name="send" />
      </template>
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date v-model="book.pubDate" mask="YYYY-MM-DD" @input="() => $refs.qDateProxy.hide()" value=""/>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-input value="" v-model="book.bookPrice" type="number" prefix="出售价格:" suffix="￥">
      <template v-slot:prepend>
        <q-icon name="money" />
      </template>
    </q-input>
    <br>
    <q-editor v-model="book.des" value=""/>
    <br>
  </div>
</template>

<script>
import NeedVerify from 'pages/verify/needVerify'
import picUpload from 'components/picUpload'

import { date } from 'quasar'

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
        phone: '14787461136',
        weiXin: '1111',
        des: '',
        files: [] // 上传图片
      },
      files_arr: [],
      options: [], // 下拉选择框
      btnFlag: false // 发布按钮是否能点击
    }
  },
  methods: {
    checkFile (files) {
      return files.filter(file => file.size < 2048 * 2048 * 4)
    },
    addImage (files) {
      files.forEach(item => {
        this.files_arr.push(item)
      })
      console.log(this.book.files)
    },
    reImage (files) {
      for (let i = 0; i < this.files_arr.length; i++) {
        const item = this.files_arr[i]
        if (item.name === files[0].name) {
          this.files_arr.splice(i, 1)
          break
        }
      }
      console.log(this.book.files)
    },
    onClickSubmit () {
      // console.log(this.files_arr)
      this.files_arr.forEach(item => {
        this.book.files.push(item.__img.currentSrc)
      })
      this.$axios.post('/book/save', this.book).then((res) => {
        res.data.page.pageInfo.list.forEach(item => {
          item.otherPic = 'http://47.106.222.50:8083' + this.splitMth(item.otherPic)
          this.items.push(item)
        })
      })
    },
    // 初始化图书类型下拉框
    initBookTypeSelect () {

    },
    getBookMsg () {
      this.$axios.get('/book/getById/' + this.book.id).then(res => {
        if (res.data.code === 100) {
          this.book = res.data.page.info
          this.book.pubDate = date.formatDate(this.book.pubDate, 'YYYY-MM-DD')
          const arr = this.book.bookPic.split(',')
          console.log(arr)
          // $.each(arr, (index, item) => {
          //   this.urls.push({ url: this.$file(item) })
          // })
        }
      })
    }
  },
  components: {
    NeedVerify,
    picUpload
  },
  created () {
    this.book.id = this.$route.query.id
    if (this.book.id) {
      this.getBookMsg(this.book.id)
    }
    this.initBookTypeSelect()
  }
}
</script>
