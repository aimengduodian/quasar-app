<template>
  <div class="search-modal">
    <pre v-text="$attrs"/>
    <!--modal-->
    <q-layout v-model="layoutModal"
             :content-css="{minWidth: '100vw', minHeight: '100vh'}">
        <q-toolbar
          slot="header">
          <q-btn
            flat
            round
            @click="layoutModal = false"
            icon="reply"
          />
          <q-toolbar-title>
            <q-search inverted color="white"
                      @click.native="show()"
                      v-model="terms"
                      placeholder="点击搜索">
              <q-autocomplete
                @search="search"
                @selected="selected"
              />
            </q-search>
          </q-toolbar-title>
        </q-toolbar>
        <div class="layout-padding">
          <!--content-->
        </div>
    </q-layout>
  </div>
</template>

<script>
export default {
  props: {
  },
}
</script>
