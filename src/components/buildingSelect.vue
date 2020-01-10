<template>
  <div class="q-pa-md" style="width: 100%">
    <div>
      <span class="text-h5">选择寝楼</span>
    </div>
    <br>

    <q-input value="" v-model="buildingNumber" type="number" prefix="楼号:">
      <template v-slot:prepend>
        <q-icon name="account_circle"/>
      </template>
    </q-input>

    <br>
    <q-btn color="primary" class="full-width" label="提交" @click="submitHandler"/>
    <br>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        buildingNumber: null
      }
    },
    methods: {
      // 提交数据
      submitHandler () {
        const query = {
          buildingNum: this.buildingNumber
        }

        this.$axios.post('user/updateBuildingNum', query).then(res => {
          if (Number(res.data.code) === 100) {
            this.$q.notify('设置成功')
            // 跳转回原页面
            this.$router.go(-1)
          } else {
            this.$q.notify('设置失败')
          }
        })
      }
    }
  }
</script>
