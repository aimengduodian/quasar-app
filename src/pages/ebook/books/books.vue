<template>
  <div class="q-pa-md">
    <q-infinite-scroll @load="onLoad" :offset="scrollOffset">
      <div v-for="(item, index) in items" :key="index"
           @click="switch_go(item.id)">
        <q-item>
          <q-item-section top thumbnail class="q-ml-none">
            <img style="object-fit: cover; border-radius: 10px" :src="item.bookPic" alt="">
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ item.bookName }}</q-item-label>
            <q-item-label caption>出版社:{{ item.bookPub }}</q-item-label>
            <q-item-label caption>发布日期：{{ formatBookDate(item.createTime) }}</q-item-label>
          </q-item-section>
        </q-item>
        <hr>
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
      <q-btn fab icon="add" color="primary" @click="addBooks"/>
    </q-page-scroller>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import config from 'src/common/config'
  import { date } from 'quasar'

  export default {
    name: 'books',
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
      if (this.$route.query.flag !== undefined) {
        this.updateFlag(this.$route.query.flag)
      } else {
        this.updateFlag(0)
      }
      this.subAdvice(true)
    },
    methods: {
      ...mapActions('auth', ['updateFlag']),
      addBooks () {
        // goto 发布界面
        this.$router.push({ name: 'books_add' })
      },
      switch_go (id) {
        this.$router.push({ name: 'books_view', query: { id: id } })
      },
      splitMth (str) {
        const strs = str.split(',')
        return strs[0]
      },
      async subAdvice (isFirstRequest = false) {
        let url = '/book/books'
        if (isFirstRequest) {
          url = '/book/books?flag=' + this.getFlag
        }
        this.scrollOffset = -Math.abs(this.scrollOffset)
        await this.$axios.post(url, this.params).then((res) => {
          res.data.page.pageInfo.list.forEach(item => {
            item.bookPic = config.picUrl + this.splitMth(item.bookPic)
            this.items.push(item)
          })
          if (!res.data.page.pageInfo.isLastPage) {
            this.params.pageNumber++
            this.scrollOffset = Math.abs(this.scrollOffset)
          } else {
            this.loadAllData = true
          }
        }).catch(err => {
          this.reRequestTime = this.reRequestTime + this.reRequestInterval
          setTimeout(() => {
            this.subAdvice(isFirstRequest)
          }, this.reRequestTime)
        })
      },
      async onLoad (index, done) {
        if (!this.loadAllData) {
          this.subAdvice()
        }
        done()
      },
      formatBookDate (val) {
        return date.formatDate(val, 'YYYY-MM-DD')
      }
    },
    computed: {
      ...mapGetters('auth', ['getFlag', 'getSearchParamsMsg'])
    },
    watch: {
      getSearchParamsMsg (val) {
        if (this.$route.name === 'books') {
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
      },
      '$route.query.flag' (val) {
        if (typeof (val) !== 'undefined' && val !== this.getFlag) {
          this.updateFlag(val)
        }
      }
    }
  }
</script>
