<template>
  <div class="q-pa-md">
    <q-infinite-scroll @load="onLoad" :offset="250">
      <div v-for="(item, index) in items" :key="index"
           @click="switch_go(item.id)">
        <q-card style="border-radius: 10px;
            width: 48%; float: left; margin: 1%">
          <img :src="item.otherPic" alt="">
          <q-card-section>
            <div class="text-h6">{{ item.otherName }}</div>
            <div class="text-subtitle2">价格：￥{{ item.presentPrice }}</div>
          </q-card-section>
        </q-card>
      </div>
      <!--添加消息-->
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
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
export default {
  data () {
    return {
      pageSize: 5,
      pageNumber: 1,
      lastPage: 0,
      items: []
    }
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
    subAdvice () {
      const _that = this

      this.$axios.post('/other/others', {
        pageSize: _that.pageSize,
        pageNumber: _that.pageNumber
      }).then((res) => {
        this.lastPage = res.data.page.pageInfo.lastPage
        res.data.page.pageInfo.list.forEach(item => {
          item.otherPic = 'http://47.106.222.50:8083' + this.splitMth(item.otherPic)
          this.items.push(item)
        })
        if (!res.data.page.pageInfo.isLastPage) {
          _that.pageNumber++
        }
      })
    },
    onLoad (index, done) {
      setTimeout(() => {
        this.subAdvice()
        done()
      }, 1000)
    }
  },
  computed: {
    ...mapState('auth', ['flag']),
    ...mapGetters('auth', ['power', 'powerFlag'])
  }
}
</script>
