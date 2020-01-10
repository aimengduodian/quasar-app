<template>
  <div style="height: 120px">
    <div class="row justify-around text-grey-3">
      <div class="col-3">
        <br>
        <img style="width: 64px;
                height: 64px;
                border-radius: 10px;
                margin-left: 20px"
             src="statics/boy-avatar.png"
             alt="">
      </div>
      <div class="col-5">
        <br>
        <div class="q-title">
          <strong>商店名称</strong>
        </div>
        <div class="q-body-2">
          作者
        </div>
        <div class="q-caption">
          出版
        </div>
      </div>
      <div class="col-2"></div>
    </div>
    <img src="~assets/donuts.png" class="background"/>
  </div>
</template>

<script>
  export default {
    name: 'shop-headers',
    props: {
      seller: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    methods: {},
    components: {}
  }
</script>

<style lang="stylus">
  .background
    position absolute
    top 0
    left 0
    width 100%
    height 150px
    z-index -1
    filter blur(10px)
</style>
