<template>
  <q-page padding class="docs-input justify-center">
    <q-list >
      <q-item
        clickable
        v-for="(dialog, index) in options"
        :key="index"
        @click.native="reportMsg(dialog.id)"
        active-class="text-orange"
      >
        <q-item-section avatar>
          <q-icon name="edit" />
        </q-item-section>
        <q-item-section>{{ dialog.name }}</q-item-section>
        <q-item-section side>点击</q-item-section>
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
            type: 'text' // optional
          },
          cancel: true,
          persistent: true
        }).onOk(data => {
          this.$axios.post('/reportproduct/save', this.product, () => {
            // 跳转回原页面
            this.$router.go(-1)
          })
          // console.log('>>>> OK, received', data)
        }).onCancel(() => {
          // console.log('>>>> Cancel')
        }).onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
      }
      else {
        this.$q.dialog({
          title: '确认举报吗？',
          message: '平台将根据《e书平台公约》进行相关处理!',
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.$axios.post('/reportproduct/save', this.product).then(res => {
            console.log(res)
            // 跳转回原页面
            this.$router.go(-1)
          })
        }).onCancel(() => {
          // console.log('>>>> Cancel')
        }).onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
      }
    }
  }
}
</script>
