<template>
  <q-page class="row justify-center">
    <q-infinite-scroll :handler="refresher">
      <q-btn v-for="(item, index) in items"
             :key="index"
             @click="switch_go(item.id)"
             style="text-align: left; width: 100%; margin: 0; padding: 0"
      >
        <q-card
          inline
          style="border-radius: 20px; margin: 5px 2%; width: 98%;"
          :color=cardColor[item.type]>
          <q-card-title>
            {{ item.name }}
            <span slot="subtitle">薪酬：￥ {{ item.price }}</span>
            <q-icon slot="right" :name = type[item.type] />
          </q-card-title>
          <q-card-main>
            begin: {{ item.startTime }}
            <br>
            end: {{ item.endTime }}
          </q-card-main>
        </q-card>
      </q-btn>

      <!--添加消息-->
      <div class="row justify-center" style="margin-bottom: 50px;">
        <q-spinner-dots slot="message" :size="40" />
      </div>
    </q-infinite-scroll>
    <!--返回到顶部-->
    <q-page-sticky position="bottom-left" :offset="[0, 100]">
      <a
        v-back-to-top.animate="1000"
        class="animate-pop play-backtotop non-selectable shadow-2"
        v-ripple.mat
      >
        Back to top
      </a>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import view from './view'

export default {
  components: {
    view
  },
  data () {
    return {
      type: ['alarm', 'mail'],
      cardColor: ['secondary', 'primary'],
      pageSize: 5,
      pageNumber: 1,
      lastPage: 0,
      items: [],
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  methods: {
    switch_go (id) {
      let itemId = 0
      if (!this.powerFlag) {
        itemId = id
      }
      this.$router.push({ name: 'coach_view', query: { id: itemId } })
    },
    splitMth (str) {
      const strs = str.split(',')
      return strs[0]
    },
    subAdvice () {
      const _that = this

      this.$axios.post('/tutoring/tutorings', {
        pageSize: _that.pageSize,
        pageNumber: _that.pageNumber
      }).then((res) => {
        this.lastPage = res.data.page.pageInfo.lastPage
        res.data.page.pageInfo.list.forEach(item => {
          this.items.push(item)
        })
        if (!res.data.page.pageInfo.isLastPage) {
          _that.pageNumber++
        }
      })
    },
    refresher (index, done) {
      setTimeout(() => {
        this.subAdvice()
        done()
      }, 100)
    }
  },
  computed: {
    ...mapGetters('auth', ['power', 'powerFlag'])
  }
}
</script>

<style lang="stylus">
  @import '~variables'

  .play-backtotop
    color white
    top 30%
    padding 15px
    width 90px
    background-color $cyan
    border-radius 0 15px 15px 0
    &:hover
      color $grey-4

    .q-card
      width 80%
</style>
