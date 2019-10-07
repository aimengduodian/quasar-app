<template>
  <q-modal v-model="opened" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-toolbar-title class="text-center">
          app Privacy Policy
        </q-toolbar-title>
      </q-toolbar>

      <q-toolbar slot="footer">
        <q-btn @click="opened = false" class="full-width" flat>
          关闭
        </q-btn>
      </q-toolbar>

      <div class="layout-padding privacy-policy">
        <p>
          内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
        </p>

        <p class="caption">title</p>
        <p>
          内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
        </p>

        <p class="caption">title</p>
        <p>
          内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
        </p>

        <p class="caption">title</p>
        <p>
          内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
        </p>

        <p class="caption">title</p>
        <p>
          内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
        </p>

        <p class="caption">title</p>
        <p>
          内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
          <a href="mailto:razvan.stoenescu@gmail.com">123@gmail.com</a>.
        </p>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
export default {
  data () {
    return {
      opened: false
    }
  },
  methods: {
    show () {
      this.opened = true
    }
  }
}
</script>

<style lang="stylus">
.privacy-policy
  h6
    margin-top 25px
    margin-bottom 10px
  p.caption
    margin-top 0
    &:first-child
      margin-bottom 35px
</style>
