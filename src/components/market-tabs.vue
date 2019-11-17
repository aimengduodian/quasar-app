<template>
  <q-tabs color="primary" v-model="tab"
          active-color="primary"
          indicator-color="transparent"
          class="row text-grey"
  >
    <q-route-tab name="books"
                 class="col"
                 icon="play_circle_outline"
                 :to="{name: 'books'}"
                 eplace label="图书"
    />
    <q-route-tab name="electronics"
                 class="col"
                 icon="view_array"
                 :to="{name: 'electronics'}"
                 replace label="电子"
    />
    <q-route-tab name="coach"
                 class="col"
                 icon="pin_drop"
                 :to="{name: 'coach'}"
                 replace
                 label="辅导"
    />
    <q-route-tab name="others"
                 class="col"
                 icon="play_for_work"
                 :to="{name: 'others'}"
                 replace
                 label="其他"
    />
    <q-route-tab name="person"
                 class="col"
                 icon="people"
                 :to="{name: 'person'}"
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
