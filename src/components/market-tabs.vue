<template>
  <q-tabs class="row" color="primary">
    <q-route-tab class="col"
                 icon="play_circle_outline"
                 :to="{name: 'books'}"
                 eplace label="图书"
    />
    <q-route-tab class="col"
                 icon="view_array"
                 :to="{name: 'electronics'}"
                 replace label="电子"
    />
    <q-route-tab class="col"
                 icon="pin_drop"
                 :to="{name: 'coach'}"
                 replace
                 label="辅导"
    />
    <q-route-tab class="col"
                 icon="play_for_work"
                 :to="{name: 'others'}"
                 replace
                 label="其他"
    />
    <q-route-tab class="col"
                 icon="people"
                 :to="{name: 'person'}"
                 replace
                 label="我的"
    />
  </q-tabs>
</template>

<script>
export default {
  name: 'DemoTabs'
}
</script>
