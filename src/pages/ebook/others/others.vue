<template>
  <div class="q-pa-md">
    <q-infinite-scroll @load="onLoad" :offset="350">
      <div class="row items-start">
        <q-card class="my-card" v-for="(item, index) in items"
                :key="index" @click="switch_go(item.id)">
          <img style="object-fit: cover; width: 100%; height: 200px;"
               :src="item.otherPic" alt="">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" alt="">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ item.otherName }}</q-item-label>
              <q-item-label caption>价格：￥{{ item.presentPrice }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
      <!--添加消息-->
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots v-if="!loadAllData" color="primary" size="40px" />
          <span v-else> 已经没有更多数据 </span>
        </div>
      </template>
    </q-infinite-scroll>
    <!--回到顶部-->
    <q-page-scroller v-if="!flag" position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="primary" />
    </q-page-scroller>
    <q-page-scroller v-else position="bottom-right" :scroll-offset="-150" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="addOthers" />
    </q-page-scroller>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import config from 'src/common/config'

export default {
  data () {
    return {
      loadAllData: false,
      pageSize: 15,
      pageNumber: 1,
      lastPage: 0,
      items: []
    }
  },
  created () {
    this.subAdvice()
  },
  methods: {
    addOthers () {
      // goto 发布界面
      this.$router.push({ name: 'others_add' })
    },
    switch_go (id) {
      let itemId = 0
      if (!this.powerFlag) {
        itemId = id
      }
      this.$router.push({ name: 'others_view', query: { id: itemId } })
    },
    splitMth (str) {
      const strs = str.split(',')
      return strs[0]
    },
    async subAdvice () {
      await this.$axios.post('/other/others', {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber
      }).then((res) => {
        this.lastPage = res.data.page.pageInfo.lastPage
        res.data.page.pageInfo.list.forEach(item => {
          item.otherPic = config.picUrl + this.splitMth(item.otherPic)
          this.items.push(item)
        })
        if (!res.data.page.pageInfo.isLastPage) {
          this.pageNumber++
        } else {
          this.loadAllData = true
        }
      })
    },
    onLoad (index, done) {
      setTimeout(() => {
        if (!this.loadAllData) {
          this.subAdvice()
          done()
        }
      }, 2500)
    }
  },
  computed: {
    ...mapState('auth', ['flag']),
    ...mapGetters('auth', ['power', 'powerFlag'])
  }
}
</script>

<style lang="sass" scoped>
  .my-card
    width: 48%
    border-radius: 10px
    margin: 1%
</style>
