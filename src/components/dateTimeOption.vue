<template>
  <q-date
    v-if="firstStep"
    float-label="floatLabel"
    v-model="dateSelect"
    :mask="dateTimeMask"
    value=""
  />

  <q-time
    v-else
    float-label="float-label"
    v-model="dateTimeSelect"
    :mask="dateTimeMask"
    format24h
    value=""
  >
    <div class="row items-center justify-end q-gutter-sm">
      <q-btn label="返回修改日期" color="primary" flat @click="flag = !flag" v-close-popup />
      <q-btn label="确定" color="primary" flat @click="saveDateTime" v-close-popup />
    </div>
  </q-time>
</template>
<script>

export default {
  data () {
    return {
      firstStep: true,
      dateTimeMask: null,
      dateSelect: '',
      dateTimeSelect: ''
    }
  },
  props: {
    dateString: {
      type: String,
      default: null
    },
    isTime: {
      type: Boolean,
      default: true
    }
  },
  created () {
    if (this.isTime) {
      this.dateTimeMask = 'YYYY-MM-DD HH:mm'
      this.dateSelect = this.dateString
      console.log(this.dateSelect)
    }
    else {
      this.dateTimeMask = 'YYYY-MM-DD'
    }
  },
  methods: {
    saveDateTime () {
      this.$emit('input', this.dateTimeSelect)
    }
  },
  watch: {
    'dateSelect' (val) {
      if (this.isTime) {
        this.dateTimeSelect = val
        this.firstStep = false
      }
      else {
        this.$emit('input', this.dateSelect)
      }
    }
  }
}
</script>
