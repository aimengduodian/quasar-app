<template>
  <div class="q-pa-md" style="width: 100%">
    <form @submit.prevent.stop="onSubmit" class="q-gutter-md">
      <div class="row">
        <div class="col-9 text-center" >
          <span class="text-h5">编辑图书信息</span>
        </div>
        <div class="col-3">
          <q-btn rounded color="blue" label="发布" @click="onSubmit" />
        </div>
      </div>
      <br>

      <pic-upload :urls="JSON.stringify(urls)" @filesArr="getPicFiles"/>

      <q-input :rules="[val => val && val.length > 0 || '图书名称不能为空']"
               ref="bookName" type="text" prefix="名称:"
               value="" v-model="book.bookName">
        <template v-slot:prepend>
          <q-icon name="book" />
        </template>
      </q-input>

      <q-input :rules="[val => val && val.length > 0 || '作者不能为空']"
               ref="author" value="" v-model="book.author"
               type="text" prefix="作者:">
        <template v-slot:prepend>
          <q-icon name="people" />
        </template>
      </q-input>

      <q-input :rules="[val => val && val.length > 0 || '出版社不能为空']"
               v-model="book.bookPub" ref="bookPub"
               type="text" prefix="出版社:">
        <template v-slot:prepend>
          <q-icon name="mail" />
        </template>
      </q-input>

      <q-select :rules="[val => val && val.length > 0 || '图书类型不能为空']"
                v-model="book.bookType" ref="bookType"
                :options="getBookTypeNameArr" prefix="分类:"
      >
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-select>

      <q-input :rules="[val => val && val.length > 0 || '出版日期不能为空']"
               v-model="book.pubDate" ref="pubDate"
               readonly prefix="出版日期:">
        <template v-slot:prepend>
          <q-icon name="send" />
        </template>
        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
          <date-time :max-date="maxDate" :date-string="book.pubDate" :is-time=false @input="setBookPubDate"/>
        </q-popup-proxy>
      </q-input>

      <q-input :rules="[ val => val > 0 && val < 1000 || '出售价格非法']"
               v-model="book.bookPrice" ref="bookPrice"
               type="number" prefix="出售价格:" suffix="￥"
      >
        <template v-slot:prepend>
          <q-icon name="money" />
        </template>
      </q-input>
      <br>
      <q-editor v-model="book.des" value=""/>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
      urls: [],
      btnFlag: false // 发布按钮是否能点击
    }
  },
  methods: {
    setBookPubDate (val) {
      this.book.pubDate = val
      this.$refs.qDateProxy.hide()
    },
    getPicFiles (files) {
      this.book.files = files
    },
    async onSubmit () {
      let url = '/book/save'
      if (this.updateFlag) {
        url = '/book/update'
      }
      // 判断图片是否为空
      if (this.book.files.length < 1) {
        this.$q.notify('至少添加一张图片')
        return
      }
      this.$refs.bookName.validate()
      this.$refs.author.validate()
      this.$refs.bookPub.validate()
      this.$refs.bookType.validate()
      this.$refs.pubDate.validate()
      this.$refs.bookPrice.validate()
      // 校验
      if (this.$refs.bookName.hasError ||
        this.$refs.author.hasError ||
        this.$refs.bookPub.hasError ||
        this.$refs.bookType.hasError ||
        this.$refs.pubDate.hasError ||
        this.$refs.bookPrice.hasError) {
        return
      }

      const bookMsg = JSON.parse(JSON.stringify(this.book))
      bookMsg.files = this.book.files
      bookMsg.bookType = this.getBookTypeNumberByName(bookMsg.bookType)
      try {
        this.$q.loading.show({
          message: '上传中...'
        })
        await this.$axios.post(url, bookMsg).then((res) => {
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
    getBookMsg () {
      const bookMsg = JSON.parse(this.getPageMsg)
      Object.keys(this.book).forEach(key => {
        this.book[key] = bookMsg[key]
      })
      console.log(this.book.bookPrice)
      this.urls = bookMsg.url
    }
  },
  computed: {
    ...mapGetters('auth', ['getPageMsg']),
    ...mapGetters('staticData', ['getBookTypeNameArr', 'getBookTypeNumberByName'])
  },
  created () {
    this.book.id = this.$route.query.id
    if (this.book.id) {
      this.updateFlag = true
      this.getBookMsg(this.book.id)
    }
    this.maxDate = date.formatDate(Date.now(), 'YYYY/MM/DD')
  }
}
</script>
