<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="showDialog"
              :maximized="maximizedToggle"
              transition-show="slide-up"
              transition-hide="slide-down"
    >
      <q-card>
        <q-bar>
          <q-btn dense flat icon="close" @click="closeDialog">
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-item
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
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      maximizedToggle: true,
      selected: 0, // 举报类型
      options: [],
      value: '', // 其他类型描述
      disabled: true
    }
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    product: {
      type: Object,
      default: function () {
        return {
          productId: null,
          productName: null,
          // 产品类型 {1：图书，2：电子，3：其他}
          productType: null
        }
      }
    }
  },
  created () {
    // 获取举报类型
    this.options = this.getReportTypeNameArr
  },
  computed: {
    ...mapGetters('staticData', ['getReportTypeNameArr'])
  },
  methods: {
    reportMsg (index) {
      this.product['reportType'] = index
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
          try {
            this.product['des'] = data
            this.$axios.post('/reportproduct/save', this.product).then((res) => {
              this.$q.notify('感谢亲们的举报，我们会尽快处理！')
            })
          }
          catch (e) {
            console.log(e)
          }
          finally {
            this.closeDialog()
          }
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
          try {
            this.$axios.post('/reportproduct/save', this.product).then((res) => {
              this.$q.notify('感谢亲们的举报，我们会尽快处理！')
            })
          }
          catch (e) {
            console.log(e)
          }
          finally {
            this.closeDialog()
          }
        }).onCancel(() => {
          // console.log('>>>> Cancel')
        }).onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
      }
    },
    closeDialog () {
      this.$emit('closeDialog')
    }
  }
}
</script>
