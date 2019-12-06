<template>
  <q-page padding class="page-showcase">
    <div class="row justify-center">
      <div style="width: 850px; max-width: 90vw;">
        <q-btn
          color="secondary"
          :to="{name: 'version'}"
          class="full-width"
          target="_blank"
          no-ripple
          label="关于我们"
        />
        <div><br></div>
        <q-btn
          color="secondary"
          :to="{name: 'advice'}"
          class="full-width"
          target="_blank"
          no-ripple
          label="提供建议"
        />
        <div><br></div>
        <q-btn
          color="secondary"
          :to="{name: 'verify'}"
          class="full-width"
          target="_blank"
          no-ripple
          label="学生认证"
        />
        <div><br></div>
      </div>
    </div>
  </q-page>
</template>

<script>

export default {

}
</script>

<style lang="stylus">

q-btn
  margin 20px
</style>
