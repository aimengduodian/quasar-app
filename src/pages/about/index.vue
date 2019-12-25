<template>
  <div class="fixed-center text-center">
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
  </div>
</template>
