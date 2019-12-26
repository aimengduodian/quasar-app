<template>
  <div class="q-pa-md">
    <q-infinite-scroll @load="onLoad" :offset="250">
      <div v-for="(item, index) in items" :key="index"
           @click="switch_go(item.id)">
        <q-item>
          <q-item-section>
            <div class="text-h6">{{ item.name }}</div>
            <div class="text-subtitle2">薪酬：￥ {{ item.price }}</div>
            <div class="text-subtitle2">类型：{{ type[item.type] }}</div>
          </q-item-section>
          <q-item-section top thumbnail class="q-ml-none">
            <img style="object-fit: cover; height: 100%"
                 :src="picShow(item)" alt="" >
          </q-item-section>
        </q-item>
        <hr>
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
      <q-btn fab icon="add" color="primary" @click="addCoach" />
    </q-page-scroller>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      loadAllData: false,
      type: ['辅导', '讲座'],
      // cardColor: ['white', 'white'],
      pageSize: 5,
      pageNumber: 1,
      lastPage: 0,
      items: []
    }
  },
  created () {
    this.updateLayoutMsg({header: true, footer: true})
    this.subAdvice()
  },
  methods: {
    ...mapActions('auth', ['updateLayoutMsg']),
    addCoach () {
      // goto 发布界面
      this.$router.push({ name: 'coach_add' })
    },
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
    async subAdvice () {
      await this.$axios.post('/tutoring/tutorings', {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber
      }).then((res) => {
        this.lastPage = res.data.page.pageInfo.lastPage
        res.data.page.pageInfo.list.forEach(item => {
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
    ...mapGetters('auth', ['power', 'powerFlag']),
    picShow: function () {
      return function (item) {
        const nowDate = Date.now()
        const isFresh = nowDate < item.startTime
        const isOrdered = item.orderUser !== null
        let picPath = ''
        if (this.flag === 1) {
          picPath = 'statics/waiting.png'
          if (isOrdered && isFresh) {
            picPath = 'statics/doing.png'
          }
          if (isOrdered && !isFresh) {
            picPath = 'statics/slice.png'
          }
          if (!isOrdered && !isFresh) {
            picPath = 'statics/overdue.png'
          }
        }
        return picPath
      }
    }
  }
}
</script>
