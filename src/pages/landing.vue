<template>
  <div class="index-page bg-grey-2 window-height window-width column items-center no-wrap">
    <div class="banner bg-primary flex flex-center">
      app
    </div>
    <div class="text-center">
      <div class="card bg-white shadow-4 column no-wrap flex-center group">
        <img alt="pic" src="~assets/quasar-play-logo-full.svg">
        <br>
        <q-btn
          color="secondary"
          :to="{name: 'books'}"
          class="full-width"
          target="_blank"
          icon="launch"
          no-ripple
          @click="onclickBuy"
          label="我要购买"
        />
        <q-btn
          color="secondary"
          :to="{name: 'books'}"
          class="full-width"
          target="_blank"
          icon="launch"
          no-ripple
          @click="onclickSell"
          label="我要发布"
        />
        <q-btn
          color="secondary"
          :to="{name: 'about'}"
          class="full-width"
          target="_blank"
          icon="launch"
          no-ripple
          label="其他页面"
        />
        <privacy-policy ref="privacy" />
      </div>
    </div>
    <a class="ribbon" :title="`learning v${version}`">&nbsp;</a>
  </div>
</template>

<script>
import PrivacyPolicy from 'components/privacy-policy'
import { mapActions } from 'vuex'

export default {
  components: {
    PrivacyPolicy
  },
  data () {
    return {
      version: '0.1.0' // 软件版本
    }
  },
  methods: {
    ...mapActions('auth', ['updateFlag']),
    onclickBuy () {
      this.updateFlag(0)
    },
    onclickSell () {
      this.updateFlag(1)
    }
  }
}
</script>

<style lang="stylus">
.index-page
  .banner
    height 50vh
    width 100%
    font-size 30vmax
    color rgba(255, 255, 255, .2)
    overflow hidden
  .card
    width 80vw
    max-width 500px
    padding 10px 25px
    margin-top -90px
    border-radius 2px
    img
      height 140px
      width 140px

.ribbon
  width 14.1em
  height 14.1em
  position absolute
  overflow hidden
  top 0
  right 0
  z-index 39
  pointer-events none
  font-size 15px
  text-decoration none
  text-indent -999999px
  opacity 0.7
  &.fixed
    position fixed
  &:before
    content ''
    padding .38em 0
    background-color white
    background-image linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, .15))
    box-shadow 0 .15em .23em 0 rgba(0, 0, 0, .5)
    pointer-events auto
  &:after
    content attr(title)
    color #027be3
    line-height 1.54em
    text-decoration none
    text-align center
    text-indent 0
    padding .15em 0
    margin .15em 0

  &:before, &:after
    position absolute
    display block
    width 23.38em
    height 1.74em
    top 4.8em
    right -5.8em
    transform rotate(45deg)
</style>
