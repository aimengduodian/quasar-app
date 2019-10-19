<template>
  <q-tabs
    color="primary"
    :inverted="$q.theme === 'ios'"
    :style="$q.theme === 'ios' ? { background: 'rgba(255,255,255,0.95' } : null"
  >
    <q-route-tab slot="title"
                 icon="play_circle_outline"
                 to="/ebook/market/books"
                 eplace label="图书"
    />
    <q-route-tab slot="title"
                 icon="view_array"
                 to="/ebook/market/electronics"
                 replace label="电子"
    />
    <q-route-tab slot="title"
                 icon="pin_drop"
                 to="/ebook/market/coach"
                 replace
                 label="辅导"
    />
    <q-route-tab slot="title"
                 icon="play_for_work"
                 to="/ebook/market/others"
                 replace
                 label="其他"
    />
  </q-tabs>
</template>

<script>
export default {
  name: 'DemoTabs'
}
</script>
