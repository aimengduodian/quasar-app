<template>
  <q-layout view="lHh LpR lFf">
    <!--reveal滚动隐藏页眉页脚-->
    <q-layout-header reveal>
      <q-toolbar :inverted="$q.theme === 'ios'">
        <q-btn
          flat
          round
          dense
          v-go-back.single="pageMeta.backRoute"
          class="cordova-only electron-only"
          icon="arrow_back"
          aria-label="Go back"
        />
        <q-toolbar-title>
          <q-icon
            v-show="pageMeta.icon"
            style="font-size: 2rem; margin-right: 5px;"
            :name="pageMeta.icon"
          />
          {{ pageMeta.title }}
        </q-toolbar-title>
        <q-btn
          flat
          round
          dense
          class="within-iframe-hide"
          @click="drawerState = !drawerState"
          icon="menu"
          aria-label="Menu"
        />
      </q-toolbar>
      <ebook-tabs v-if="$q.theme === 'mat'"/>
    </q-layout-header>
    <!--页脚-->
    <q-layout-footer reveal v-if="$q.theme === 'ios'">
      <ebook-tabs/>
    </q-layout-footer>
    <!--侧边栏-->
    <q-layout-drawer v-model="drawerState" show-if-above>
      <q-scroll-area
        style="width: 100%; height: 100%;"
        :class="$q.theme === 'mat' ? 'bg-grey-3' : null"
      >
        <!--侧边栏头-->
        <div class="row flex-center bg-white" style="height: 115px">
          <img alt="Quasar logo" src="~assets/quasar-logo.svg" style="height: 75px; width: 75px;">
          <div class="caption q-ml-md">
            Test v{{ $q.version }}
          </div>
        </div>
        <q-list no-border>
          <q-item to="/ebook" exact replace>
            <q-item-side icon="home"/>
            <q-item-main label="ebook home"/>
          </q-item>
          <q-item-separator/>
          <template v-for="category in categories">
            <q-list-header :key="`header-${category.title}`">
              {{ category.title }}
            </q-list-header>
            <q-item
              v-for="feature in category.features"
              :key="feature.hash"
              :to="`/ebook/${category.hash}/${feature.hash}`"
              :replace="!category.extract"
            >
              <q-item-side :icon="feature.icon"/>
              <q-item-main :label="feature.title"/>
              <!--
              <q-item-side right v-if="feature.status">
                <q-chip dense color="faded">{{ feature.status }}</q-chip>
              </q-item-side>
              -->
            </q-item>
            <q-item-separator :key="`separator-${category.title}`"/>
          </template>
        </q-list>
      </q-scroll-area>
    </q-layout-drawer>

    <q-page-container>
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
        :duration="300"
        @leave="resetScroll"
      >
        <router-view/>
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import EbookTabs from 'components/ebook-tabs'
import { mapState } from 'vuex'
import categories from 'assets/ebook'

export default {
  components: {
    EbookTabs
  },
  data () {
    return {
      categories
    }
  },
  computed: {
    drawerState: {
      get () {
        return this.$store.state.ebook.drawerState
      },
      set (val) {
        this.$store.commit('ebook/updateDrawerState', val)
      }
    },
    ...mapState('ebook', [
      'pageMeta'
    ])
  },
  methods: {
    resetScroll (el, done) {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      done()
    }
  },
  created() {
    // this.$q.fullscreen.toggle()
  }
}
</script>
