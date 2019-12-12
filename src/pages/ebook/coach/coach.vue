<template>
  <div class="q-pa-md">
    <q-infinite-scroll @load="onLoad" :offset="250">
      <div v-for="(item, index) in items" :key="index"
           @click="switch_go(item.id)">
        <q-card
          class="text-white"
          style="background: radial-gradient(circle, rgba(53,162,255,0.65) 0%, rgba(1,106,173,0.64) 100%)"
        >
          <q-card-section>
            <div class="text-h6">{{ item.name }}</div>
            <div class="text-subtitle2">薪酬：￥ {{ item.price }}</div>
          </q-card-section>

          <q-card-section>
            <q-icon slot="right" :name = type[item.type] />
          </q-card-section>
        </q-card>
        <br>
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
      <q-btn fab icon="add" color="primary" @click="addCoach" />
    </q-page-scroller>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      type: ['alarm', 'mail'],
      // cardColor: ['white', 'white'],
      pageSize: 5,
      pageNumber: 1,
      lastPage: 0,
      items: []
    }
  },
  created () {
    this.subAdvice()
  },
  methods: {
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
      const _that = this

      await this.$axios.post('/tutoring/tutorings', {
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
    onLoad (index, done) {
      setTimeout(() => {
        this.subAdvice()
        done()
      }, 2500)
    }
  },
  computed: {
    ...mapState('auth', ['flag']),
    ...mapGetters('auth', ['power', 'powerFlag'])
  }
}
</script>
