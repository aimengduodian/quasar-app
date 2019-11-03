<template>
  <q-page padding class="page-showcase">
    <div class="row justify-center">
      <div style="width: 850px; max-width: 90vw;" class="row">
        <q-btn
          color="secondary"
          :to="{name: 'version'}"
          class="full-width"
          target="_blank"
          no-ripple
          label="version"
        />
        <q-btn
          color="secondary"
          :to="{name: 'advice'}"
          class="full-width"
          target="_blank"
          no-ripple
          label="advice"
        />
        <q-btn
          color="secondary"
          :to="{name: 'verify'}"
          class="full-width"
          target="_blank"
          no-ripple
          label="verify"
        />
      </div>
    </div>
  </q-page>
</template>

<script>

export default {

}
</script>

<style lang="stylus">
@import '~variables'

.page-showcase
  img
    width 100px
    height 100px
    margin-bottom 15px
  .showcase-top
    margin-bottom 35px
    .q-alert
      max-width 500px
  .card
    cursor pointer
    position relative
    padding 16px
    .q-icon
      font-size 56px
    p
      color rgba(0, 0, 0, .87)
      margin 15px 0 0 0 !important
    &:before
      content ''
      position absolute
      top 0
      right 0
      bottom 0
      left 0
      border-radius 2px
      opacity 0
      transition opacity .2s
      background currentColor
    &:hover:before
      opacity .4
</style>
