<template>
  <q-page padding class="row justify-center">
    <div class="content">
      <div>
        <!--用户建议（跳转）-->
        <div class="adviceTips">
          感谢您使用
          <em>西林易市</em>，
          若你在使用中有疑虑，或者有对于此产品的建议，
          请在下面输入，我们将在24小时内回复您！
        </div>
        <q-field
          class="textarea-wrapper"
          :count="wordNum"
        >
          <q-input
            v-model="userAdvice.des"
            :max-height=250
            float-label="在此输入建议"
            type="textarea"
            @input="hasContent()"
          />
        </q-field>
        <q-btn color="primary"
               :disabled="disabled"
               @click="subAdvice()"
               class="full-width"
               label="提交"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      userAdvice: {
        des: ''
      },
      wordNum: 150,
      disabled: true
    }
  },
  methods: {
    hasContent () {
      this.disabled = !(this.userAdvice.des.trim() && this.userAdvice.des)
    },
    subAdvice () {
      this.$axios({
        method: 'GET',
        url: '/api/useradvice/save',
        params: {
          des: this.userAdvice.des
        }
      }).then(
        (req) => {
          history.back()
        }
      )
    }
  }
}
</script>

<style lang="stylus">
  .content
    width: 500px
    max-width: 90vw

  .textarea-wrapper
    margin: 20px 0
  .adviceTips
    text-indent: 35px
    > em
      font-weight: bold

</style>
