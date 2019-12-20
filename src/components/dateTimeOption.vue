<template>
  <q-date
    v-if="firstStep"
    float-label="floatLabel"
    v-model="dateSelect"
    :mask="dateTimeMask"
    :options="setDateRange"
    today-btn
    value=""
  >
    <q-btn label="设置时间" color="primary" v-if="isTime" flat
           @click="firstStep = !firstStep" />
  </q-date>

  <q-time
    v-else
    float-label="float-label"
    v-model="dateTimeSelect"
    :mask="dateTimeMask"
    :options="setTimeRange"
    format24h
    value=""
  >
    <div class="row items-center justify-end q-gutter-sm">
      <q-btn label="返回修改日期" color="primary" flat @click="firstStep = !firstStep" v-close-popup />
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
    },
    minDate: {
      type: String,
      default: null // YYYY/MM/DD
    },
    maxDate: {
      type: String,
      default: null // YYYY/MM/DD
    }
  },
  created () {
    if (this.isTime) {
      this.dateTimeMask = 'YYYY-MM-DD HH:mm'
      this.dateSelect = this.dateString
    }
    else {
      this.dateTimeMask = 'YYYY-MM-DD'
    }
  },
  methods: {
    // 设置日期范围
    setDateRange (date) {
      if (this.minDate || this.maxDate) {
        if (this.minDate && this.maxDate) {
          return date >= this.minDate && date <= this.maxDate
        }
        else if (this.minDate) {
          return date >= this.minDate
        }
        else {
          return date <= this.maxDate
        }
      }
    },
    // 设置时间范围
    setTimeRange (hr) {
      return !(hr < 7 || hr > 22)
    },
    saveDateTime () {
      this.$emit('input', this.dateTimeSelect)
    }
  },
  watch: {
    'dateSelect' (val) {
      if (this.isTime) {
        this.dateTimeSelect = val
      }
      else {
        this.$emit('input', this.dateSelect)
      }
    }
  }
}
</script>
