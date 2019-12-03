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

    <pic-upload :urls="JSON.stringify(urls)"
                @filesArr="getPicFiles"
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

    <q-select v-model="book.bookType" :options="getBookTypeNameArr" prefix="分类:">
      <template v-slot:prepend>
        <q-icon name="event" />
      </template>
    </q-select>

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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NeedVerify from 'components/needVerify'
import PicUpload from 'components/picUpload'

export default {
  data () {
    return {
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
    getPicFiles (files) {
      this.book.files = files
    },
    onClickSubmit () {
      let url = '/book/save'
      if (this.updateFlag) {
        url = '/book/update'
      }
      const bookMsg = JSON.parse(JSON.stringify(this.book))
      bookMsg.files = this.book.files
      bookMsg.bookType = this.getBookTypeNumberByName(bookMsg.bookType)
      this.$axios.post(url, bookMsg).then((res) => {
        if (res.data.code === 100) {
          this.$q.notify(res.data.msgs.msg)
        }
        else {
          this.$q.notify('Fail')
        }
        // 跳转回原页面
        this.$router.go(-1)
      })
    },
    getBookMsg () {
      const bookMsg = JSON.parse(this.getPageMsg)
      Object.keys(this.book).forEach(key => {
        this.book[key] = bookMsg[key]
      })
      this.urls = bookMsg.url
    }
  },
  components: {
    NeedVerify,
    PicUpload
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
  }
}
</script>
