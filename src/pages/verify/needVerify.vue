<template>
  <div class="text-center">
    <p>
      <img
        alt="not find png"
        src="~assets/sad.svg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-faded">
      <strong>还没有进行学生身份认证哦！</strong>
    </p>
    <q-btn
      color="secondary"
      style="width:200px;"
      @click="$router.push({name: 'verify'})"
    >前去认证</q-btn>
  </div>
</template>
