<template>
  <div class="q-pa-md">
    <p class="caption pcontent">{{ version.des }}</p>
    <blockquote>
      <small>服务电话：14787484930</small>
      <br>
      <small>服务QQ：690345407</small>
    </blockquote>
    <br>
    <div class="areaWrap justify-center">
      <img src="~assets/map.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      version: {
        title: '',
        des: ''
      }
    }
  },
  created () {
    console.log('11')
    this.about()
  },
  methods: {
    showNotify () {
      this.$q.notify((this.$q.platform.is.desktop ? 'Clicked' : 'Tapped') + ' on a context menu item.')
    },
    about () {
      this.$axios.get('/aboutus/us/').then(
        (response) => {
          this.version.des = response.data.page.pageinfo.des
          this.version.title = response.data.page.pageinfo.title
        }
      ).catch(() => {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Loading failed',
          icon: 'report_problem'
        })
      })
    }
  }
}
</script>

<style lang="stylus">
  .logoTitle
    text-align: center
    font-size: 22px
    position: relative

  .pcontent
    text-indent: 35px

  .areaWrap
    >img
      max-width: 100%
</style>
