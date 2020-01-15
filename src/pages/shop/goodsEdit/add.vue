<template>
  <div class="q-pa-md" style="width: 100%">
    <div>
      <span class="text-h5">清单</span>
    </div>
    <br>

    <q-input value="" v-model="goods.goodName" prefix="名称:">
      <template v-slot:prepend>
        <q-icon name="account_circle"/>
      </template>
    </q-input>

    <q-input value="" v-model="goods.goodPrice" type="number" prefix="价格:">
      <template v-slot:prepend>
        <q-icon name="account_circle"/>
      </template>
    </q-input>

    <q-input value="" v-model="goods.des" prefix="描述:">
      <template v-slot:prepend>
        <q-icon name="account_circle"/>
      </template>
    </q-input>
    <br>

    <pic-upload :pic-count="1" :urls="JSON.stringify(urls)" @filesArr="getPicFiles"/>
    <br>
    <div class="row">
      <div class="col">
        <q-btn color="primary" class="full-width" label="提交" @click="submitHandler"/>
      </div>
    </div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import PicUpload from 'components/picUpload'

  export default {
    components: {
      PicUpload
    },
    data () {
      return {
        updateFlag: false,
        goods: {
          id: 0,
          goodName: null,
          goodPrice: null,
          des: '',
          files: []
        },
        // 图片地址轮播
        urls: []
      }
    },
    created () {
      this.goods.id = this.$route.query.id
      if (this.goods.id) {
        this.updateFlag = true
        this.getGoodsMsg()
      }
    },
    computed: {
      ...mapGetters('auth', ['getPageMsg'])
    },
    methods: {
      // 提交数据
      submitHandler () {
        let url = '/good/save'
        if (this.updateFlag) {
          url = '/good/update'
        }

        // 判断图片是否为空
        if (this.goods.files.length < 1) {
          this.$q.notify('至少添加一张图片')
          return
        }

        try {
          this.$q.loading.show({
            message: '上传中...'
          })

          const goodsMsg = JSON.parse(JSON.stringify(this.goods))
          goodsMsg.files = this.goods.files

          this.$axios.post(url, goodsMsg).then(res => {
            if (Number(res.data.code) === 100) {
              this.$q.notify(res.data.msgs.msg)
              // 跳转回原页面
              this.$router.go(-2)
            } else {
              this.$q.notify('失败')
            }
          })
        } catch (e) {
          console.log(e)
        } finally {
          this.$q.loading.hide()
        }
      },
      getPicFiles (files) {
        this.goods.files = files
      },
      getGoodsMsg () {
        const goodsMsg = JSON.parse(this.getPageMsg)
        Object.keys(this.goods).forEach(key => {
          this.goods[key] = goodsMsg[key]
        })
        this.urls = goodsMsg.url
        console.log(this.goods)
        console.log(this.urls)
      }
    }
  }
</script>
