<template>
  <q-page padding class="docs-input justify-center">
    <q-list >
      <q-item
        link
        v-for="(dialog, index) in options"
        :key="index"
        @click.native="reportMsg(dialog.id)"
        v-ripple.mat
      >
        <q-item-side :icon="dialog.icon" />
        <q-item-main :label="dialog.name" />
        <q-item-side right icon="keyboard_arrow_right" />
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: 'Report',
  data () {
    return {
      product: {
        productId: String, // 产品id
        productName: String, // 产品name
        productType: String // 产品类型 {1：图书，2：电子，3：其他}
      },
      selected: 0, // 举报类型
      options: [],
      value: '', // 其他类型描述
      disabled: true
    }
  },
  created () {
    // 获取举报类型
    this.getReportType()
    // 初始化接受的数据
    this.product.productId = this.$route.query.productId
    this.product.productName = this.$route.query.productName
    this.product.productType = this.$route.query.productType
  },
  methods: {
    /*
     * 获取举报类型
     * @returns {null}
     */
    getReportType () {
      if (this.options.length !== 0) {
        return
      }
      this.$axios.post('/reporttype/reporttypeinfo').then((res) => {
        if (Number(res.data.code) === 100) {
          this.options = res.data.page.pageinfo
        }
        else {
          console.log(res)
        }
      })
    },
    /*
     * 提交举报信息
     * @param index
     */
    reportMsg (index) {
      if (parseInt(index) === 1) {
        // ‘其他’类型
        this.$q.dialog({
          title: '确认举报吗？',
          message: '平台将根据《e书平台公约》进行相关处理!',
          prompt: {
            model: '',
            type: 'text'
          },
          cancel: true,
          color: 'secondary'
        }).then(data => {
          this.$axios.post('/reportproduct/save', this.product, () => {
            // 跳转回原页面
            this.$router.go(-1)
          })
        }).catch((e) => {
          console.log(e)
        })
      }
      else {
        this.$q.dialog({
          title: '确认举报吗？',
          message: '平台将根据《e书平台公约》进行相关处理!',
          ok: 'Agree',
          cancel: 'Disagree'
        }).then(() => {
          this.$axios.post('/reportproduct/save', this.product).then(res => {
            console.log(res)
            // 跳转回原页面
            this.$router.go(-1)
          })
        }).catch((e) => {
          console.log(e)
        })
      }
    }
  }
}
</script>
