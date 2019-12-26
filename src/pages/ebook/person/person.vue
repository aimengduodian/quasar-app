<template>
  <div>
    <div v-if="power">
      <div class="q-pa-md row justify-around head-div">
        <div class="col-3" style="margin-left: 20px">
          <img style="border-radius: 50%; width: 80%"
               src="statics/boy-avatar.png"
               alt=""
          >
        </div>
        <div class="col-6">
          <div class="q-title">
            <strong> {{ userMsg.nickname }} </strong>
          </div>
          <div class="q-body-2">
            星级: {{ userMsg.score || '暂无' }}
          </div>
          <div class="q-body-2">
            楼栋: {{ userMsg.buildingNum || '暂无' }}
          </div>
        </div>
        <div class="col-2">
          <q-icon size="32px" @click="dialog = true"
                  name="build" />
        </div>
      </div>
      <div class="col first-person">
        <div class="row justify-around ">
          <div class="col">
            <div style="font-size: small">
              学号:{{ userMsg.studNo || '暂无' }}
            </div>
          </div>
          <div class="col">
            <div style="font-size: small">
              手机号:{{ userMsg.phone || '暂无' }}
            </div>
          </div>
        </div>
      </div>
      <div class="col person">
        <div style="text-align: left; margin: 5px 20px; font-size: large">
          <b>我的购买</b>
        </div>
        <div class="row justify-around ">
          <div class="col">
            <img style="border-radius: 10px; width: 50%"
                 src="statics/boy-avatar.png"
                 alt="head picture"
            >
            <div style="font-size: small"> 图书 0</div>
          </div>
          <div class="col">
            <img style="border-radius: 10px; width: 50%"
                 src="statics/boy-avatar.png"
                 alt="head picture"
            >
            <div style="font-size: small">
              电子 0
            </div>
          </div>
          <div class="col">
            <img style="border-radius: 10px; width: 50%"
                 src="statics/boy-avatar.png"
                 alt="head picture"
            >
            <div style="font-size: small">
              其他 0
            </div>
          </div>
        </div>
      </div>
      <div class="col person">
        <div style="text-align: left; margin: 5px 20px; font-size: large">
          <b>我的发布</b>
        </div>
        <br>
        <div class="row justify-around">
          <div class="col">
            <img style="border-radius: 10px; width: 50%"
                 src="statics/boy-avatar.png"
                 alt="head picture"
            >
            <div style="font-size: small"> 图书 0</div>
          </div>
          <div class="col">
            <img style="border-radius: 10px; width: 50%"
                 src="statics/boy-avatar.png"
                 alt="head picture"
            >
            <div style="font-size: small"> 电子 0 </div>
          </div>
          <div class="col">
            <img style="border-radius: 10px; width: 50%"
                 src="statics/boy-avatar.png"
                 alt="head picture"
            >
            <div style="font-size: small"> 辅导 0 </div>
          </div>
          <div class="col">
            <img style="border-radius: 10px; width: 50%"
                 src="statics/boy-avatar.png"
                 alt="head picture"
            >
            <div style="font-size: small"> 其他 0 </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="justify-around">
        <div style="text-align: center">
          <div>
            <img style="border-radius: 50%; width: 20%; padding-top: 20px "
                 src="statics/boy-avatar.png"
                 alt="">
          </div>
          <div class="q-title">
            <strong> 用户名称 </strong>
          </div>
        </div>
      </div>
      <br>
      <need-verify/>
    </div>

    <div id="q-app">
      <div class="q-pa-md q-gutter-sm">
        <q-dialog
          v-model="dialog"
          persistent
          :maximized="maximizedToggle"
          transition-show="slide-left"
          transition-hide="slide-right"
        >
          <q-card>
            <q-btn dense flat icon="close" v-close-popup/>

            <q-card-section>
              <q-list style="width: 100%;">
                <q-input label="手机号:" v-model="userMsg.phone"
                         mask="### #### ####" type="number">
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>

                <q-input label="邮箱:" v-model="userMsg.email" type="email" >
                  <template v-slot:prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>

                <q-input label="寝室:" v-model="userMsg.buildingNum" >
                  <template v-slot:prepend>
                    <q-icon name="home" />
                  </template>
                </q-input>
              </q-list>
            </q-card-section>

            <q-btn color="primary" style="width: 80%; margin-left: 10%"
                   @click="onClickUpdateUserMsg" label="提交" />
          </q-card>
        </q-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import NeedVerify from 'components/needVerify'

export default {
  components: {
    NeedVerify
  },
  data () {
    return {
      dialog: false,
      maximizedToggle: true,
      userMsg: {
        buildingNum: null,
        buildingNumber: null,
        createTime: null,
        dataStatus: null,
        email: null,
        flag: null,
        id: null,
        nickname: null,
        openId: null,
        password: null,
        phone: null,
        score: null,
        scoreNumber: null,
        studNo: null,
        superMarketName: null,
        updateTime: null,
        url: null,
        validCode: null,
        weiXin: null
      }
    }
  },
  created () {
    this.updateLayoutMsg({header: false, footer: true})
    this.getUserMsg()
  },
  methods: {
    ...mapActions('auth', ['updateUserCache', 'updateLayoutMsg']),
    async getUserMsg () {
      try {
        // 获取用户的信息
        // this.userMsg = JSON.parse(this.getUserDetailMsg)
        const userMsg = await this.$axios.get('/user/getUser')
        if (userMsg.data.code === 100) {
          this.userMsg = userMsg.data.page.userInfo
          const userDetail = this.userMsg
          this.updateUserCache({userDetail})
        }
        else {
          this.$q.notify('角色信息获取失败')
        }
      }
      catch (e) {
        console.log(e)
      }
    },
    async onClickUpdateUserMsg () {
      try {
        const userMsg = await this.$axios.post('/user/update', {
          id: this.userMsg.id, // 用户id
          phone: this.userMsg.phone, // 用户联系电话
          email: this.userMsg.email, // 用户邮箱
          buildingNum: this.userMsg.buildingNum // 用户楼栋
        })
        if (userMsg.data.code === 100) {
          this.getUserMsg()
        }
        else {
          this.$q.notify('角色信息获取失败')
        }
      }
      catch (e) {
        console.log(e)
      }
      finally {
        this.dialog = false
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['power', 'powerFlag', 'getUserDetailMsg'])
  }
}
</script>

<style lang="stylus">
  .head-div
    padding 20px 0;
    background-color #1381de;
    border-radius 0 0 20px 20px;

  .first-person
    background-color #fdfff8
    border-radius 5px
    margin -10px 20px 0 20px
    padding 10px 0
    text-align center

  .person
    background-color: #fdfff8
    border-radius 20px
    margin 10px
    padding 10px 0
    text-align center
</style>
