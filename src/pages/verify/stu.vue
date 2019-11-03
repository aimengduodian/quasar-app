<template>
  <q-page padding class="docs-input row justify-center">
    <h3>student verify</h3>
    <div style="width: 500px; max-width: 90vw;">
      <q-field
        icon="account_circle"
        label="student ID"
        :count="11"
        :error="error"
        :warning="warning"
      >
        <q-input v-model="stuId" />
      </q-field>
      <q-field
        icon="card_travel"
        label="Password"
        :count="20"
        :error="error"
        :warning="warning"
      >
        <q-input v-model="password" type="password"/>
      </q-field>
      <q-field
        icon="mail"
        label="email"
      >
        <q-input v-model="email" type="email" />
      </q-field>
      <br>
      <q-field
        icon="mail"
        label="verify code"
      >
        <img alt= "verify code" style="float: right" @click='freshCode()' :src='checkCodeUrl'>
        <q-input v-model="checkCode" />
      </q-field>

      <br>
      <q-btn color="primary" class="full-width" label="verify" @click="submitHandler" />
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      stuId: '',
      checkCode: '',
      checkCodeUrl: '',
      password: '',
      sessionString: '',
      email: '',
      url: '',
      error: false,
      warning: false,
      loading: true
    }
  },
  methods: {
    // 请求session字符串
    getSessionString () {
      this.$axios.post('/user/getKey').then((res) => {
        this.sessionString = res.data.page.location
        if (Number(res.data.code) === 200) {
          this.$q.notify('获取session失败')
        } else {
          this.url = 'http://202.203.132.204:8019/' + this.sessionString + '/default2.aspx'
          this.checkCodeUrl = 'http://202.203.132.204:8019/' + this.sessionString + '/CheckCode.aspx'
        }
      })
    },
    // 点击刷新验证码
    freshCode () {
      this.checkCodeUrl = 'http://202.203.132.204:8019/' + this.sessionString + '/CheckCode.aspx?' + Math.random();
    },
    // 提交数据
    submitHandler () {
      const query = {
        schoolNo: this.stuId,
        studNo: this.stuId,
        password: this.password,
        validCode: this.checkCode,
        email: this.email,
        url: this.url
      }

      this.$axios.post('user/authentication', query).then(res => {
        if (Number(res.data.code) === 200) {
          this.$q.notify(res.data.page.errors)
          this.freshCode()
        } else {
          this.$q.notify('登陆验证成功')
          this.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
        }
      })
    }
  },
  created () {
    this.getSessionString()
  },
  watch: {
    error (val) {
      if (val) {
        this.warning = false
      }
    },
    warning (val) {
      if (val) {
        this.error = false
      }
    }
  }
}
</script>
