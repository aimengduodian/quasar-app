<template>
  <div>
    <q-carousel
      swipeable
      animated
      v-model="slide"
      infinite
      height="180px"
    >
      <q-carousel-slide v-for="(item, index) in urls"
                        :key="index" :name="index"
                        :img-src="item"/>
    </q-carousel>
    <div class="q-pa-md">
      <br>
      <div class="q-title">
        <strong>{{ goods.goodName }}</strong>
      </div>
      <div> 价格: ￥{{ goods.goodPrice }}</div>
      <div> 发布日期: {{ formatBookDate(goods.createTime) }}</div>
      <div> 描述: {{ goods.des }}</div>

      <br>
      <div class="row">
        <q-btn class="col full-width" label="删除" @click="deleteGoods()"/>
        <q-btn class="col full-width" color="primary" label="编辑"
               @click="editGoods()"/>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import config from 'src/common/config'
  import common from 'src/common/common'
  import NeedVerify from 'components/needVerify'
  import Report from 'components/report'

  export default {
    components: {
      NeedVerify,
      Report
    },
    data () {
      return {
        showReport: false,
        reportMsg: null,
        slide: 0,
        // 获取详细信息
        goods: {
          id: 0,
          createTime: null,
          updateUser: null,
          updateTime: null,
          goodName: null,
          goodPrice: null,
          goodPic: null,
          weiXin: null,
          phone: null,
          des: '',
          viewTimes: null
        },
        // 图片地址
        urls: []
      }
    },
    created () {
      this.goods.id = this.$route.query.id
      if ((this.goods.id).length > 0) {
        this.initData()
      } else {
        this.$q.notify('[error]选择的物品id为0，请检查物品id是否正确!')
      }
    },
    computed: {
      ...mapGetters('auth', ['power', 'getFlag', 'powerFlag']),
      ...mapGetters('staticData', ['getBookTypeNameByNumber'])
    },
    methods: {
      ...mapActions('auth', ['updatePageMsg']),
      initData () {
        this.$axios.get('/good/getById/' + this.goods.id).then(res => {
          this.goods = res.data.page.info
          const arr = this.goods.goodPic.split(',')
          arr.forEach(item => {
            const pic = config.picUrl + item
            this.urls.push(pic)
          })
          const pageMsg = JSON.parse(JSON.stringify(this.goods))
          pageMsg.url = JSON.parse(JSON.stringify(this.urls))
          this.updatePageMsg(pageMsg)
        })
      },
      editGoods () {
        const item = {
          name: 'goods_add',
          query: {
            id: this.goods.id
          }
        }
        this.$router.push(item)
      },
      deleteGoods () {
        this.$q.dialog({
          title: '确认下架？',
          message: '下架后可在我的界面重新发布!',
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.$axios.post('/good/delete', {
            id: this.goods.id
          }).then((res) => {
            if (res.data.code === 100) {
              this.$q.notify('删除成功')
              // 跳转回原页面
              this.$router.go(-1)
            } else {
              this.$q.notify('失败')
            }
          })
        }).onCancel(() => {
          // console.log('>>>> Cancel')
        }).onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
      },
      reportBook () {
        this.showReport = true
        this.reportMsg = {
          productId: this.goods.id, // 产品id
          productName: this.goods.bookName, // 产品name
          // 产品类型 {1：图书，2：电子，3：其他}
          productType: 1
        }
      },
      formatBookDate (val) {
        return common.toDate(val, 'YYYY-MM-DD HH:mm:ss')
      }
    }
  }
</script>
