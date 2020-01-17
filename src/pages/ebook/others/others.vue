<template>
  <div class="q-pa-md">
    <q-infinite-scroll @load="onLoad" :offset="scrollOffset">
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
          <q-spinner-dots v-if="!loadAllData" color="primary" size="40px"/>
        </div>
      </template>
      <span v-if="loadAllData" class="row justify-center q-my-md"> 已经没有更多数据 </span>
    </q-infinite-scroll>
    <!--回到顶部-->
    <q-page-scroller v-if="!getFlag" position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="primary"/>
    </q-page-scroller>
    <q-page-scroller v-else position="bottom-right" :scroll-offset="-150" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="addOthers"/>
    </q-page-scroller>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import config from 'src/common/config'

  export default {
    name: 'others',
    data () {
      return {
        reRequestTime: config.reRequestBaseInterval,
        reRequestInterval: config.reRequestAddInterval,
        loadAllData: false,
        scrollOffset: 250,
        items: [],
        params: {
          pageSize: 15,
          pageNumber: 1
        }
      }
    },
    created () {
      this.params = this.getSearchParamsMsg
      this.params.pageNumber = 1
      this.subAdvice()
    },
    methods: {
      addOthers () {
        // goto 发布界面
        this.$router.push({ name: 'others_add' })
      },
      switch_go (id) {
        this.$router.push({ name: 'others_view', query: { id: id } })
      },
      splitMth (str) {
        const strs = str.split(',')
        return strs[0]
      },
      async subAdvice () {
        this.scrollOffset = -Math.abs(this.scrollOffset)
        await this.$axios.post('/other/others', this.params).then((res) => {
          this.lastPage = res.data.page.pageInfo.lastPage
          res.data.page.pageInfo.list.forEach(item => {
            item.otherPic = config.picUrl + this.splitMth(item.otherPic)
            this.items.push(item)
          })
          if (!res.data.page.pageInfo.isLastPage) {
            this.pageNumber++
          } else {
            this.loadAllData = true
            this.scrollOffset = Math.abs(this.scrollOffset)
          }
        }).catch(err => {
          this.reRequestTime = this.reRequestTime + this.reRequestInterval
          this.$q.notify('网络开小差了' + this.reRequestTime / 1000 + '秒后重新请求数据')
          setTimeout(() => {
            this.subAdvice()
          }, this.reRequestTime)
        })
      },
      onLoad (index, done) {
        if (!this.loadAllData) {
          this.subAdvice()
        }
        done()
      }
    },
    computed: {
      ...mapGetters('auth', ['getFlag', 'getSearchParamsMsg'])
    },
    watch: {
      getSearchParamsMsg (val) {
        if (this.$route.name === 'others') {
          this.loadAllData = false
          this.items = []
          this.params = []
          this.scrollOffset = Math.abs(this.scrollOffset)
          const data = JSON.parse(JSON.stringify(val))
          Object.keys(data).forEach(key => {
            this.params[key] = data[key]
          })
          this.subAdvice()
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
  .my-card
    width: 48%
    border-radius: 10px
    margin: 1%
</style>
