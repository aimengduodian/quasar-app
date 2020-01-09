<template>
  <q-tabs color="primary" v-model="tab"
          active-color="primary"
          indicator-color="transparent"
          class="row text-grey"
  >
    <q-route-tab name="books"
                 class="col"
                 icon="play_circle_outline"
                 :to="{name: 'shopList'}"
                 eplace label="首页"
    />
    <q-route-tab name="electronics"
                 class="col"
                 icon="view_array"
                 :to="{name: 'orderList'}"
                 replace label="订单"
    />
    <q-route-tab name="person"
                 class="col"
                 icon="person"
                 :to="{name: 'shopPerson'}"
                 replace
                 label="我的"
    />
  </q-tabs>
</template>

<script>
export default {
  data () {
    return {
      tab: 'books'
    }
  }
}
</script>
