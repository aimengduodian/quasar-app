<template>
  <div class="q-pa-md" style="width: 100%">
    <div>
      <span class="text-h5">学生身份认证</span>
    </div>
    <br>
    <q-input v-model="stuId" type="number" prefix="学号:">
      <template v-slot:prepend>
        <q-icon name="account_circle" />
      </template>
    </q-input>

    <q-input v-model="password" :type="isPwd ? 'password' : 'text'" prefix="密码:"
    >
      <template v-slot:prepend>
        <q-icon name="add" />
      </template>
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>

    <q-input v-model="email" type="email" mask="email" prefix="邮箱:">
      <template v-slot:prepend>
        <q-icon name="email" />
      </template>
    </q-input>

    <q-input v-model="checkCode" type="text" prefix="验证码:">
      <template v-slot:prepend>
        <q-icon name="delete" />
      </template>
      <template v-slot:append>
        <img alt= "code" @click='freshCode()' :src='checkCodeUrl'>
      </template>
    </q-input>
    <br>
    <q-btn color="primary" class="full-width" label="提交" @click="submitHandler" />
    <br>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isPwd: true,
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
        }
        else {
          this.url = 'http://202.203.132.204:8019/' + this.sessionString + '/default2.aspx'
          this.checkCodeUrl = 'http://202.203.132.204:8019/' + this.sessionString + '/CheckCode.aspx'
        }
      })
    },
    // 点击刷新验证码
    freshCode () {
      this.checkCodeUrl = 'http://202.203.132.204:8019/' + this.sessionString + '/CheckCode.aspx?' + Math.random()
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
        }
        else {
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
