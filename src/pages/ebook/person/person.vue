<template>
  <div>
    <div v-if="power">
      <div class="q-pa-md row justify-around head-div">
        <div class="col-3">
          <img style="border-radius: 50%; width: 80%"
               src="statics/boy-avatar.png"
               alt=""
          >
        </div>
        <div class="col-5">
          <div class="q-title">
            <strong> {{ userMsg.nickname }} </strong>
          </div>
          <div class="q-body-2">
            星级: {{ userMsg.score || '暂无' }}
          </div>
          <div class="q-body-2">
            <q-btn style="padding-left:0" flat icon="thumb_up" label="详细信息" />
          </div>
        </div>
      </div>
      <div class="col first-person">
        <div class="row justify-around ">
          <div class="col">
            <div style="font-size: small"> 我买到的 0</div>
          </div>
          <div class="col">
            <div style="font-size: small">
              我的辅导 0
            </div>
          </div>
          <div class="col">
            <div style="font-size: small">
              我的辅导 0
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
            <div style="font-size: small"> 我买到的 0</div>
          </div>
          <div class="col">
            <img style="border-radius: 10px; width: 50%"
                 src="statics/boy-avatar.png"
                 alt="head picture"
            >
            <div style="font-size: small">
              我的辅导
            </div>
          </div>
          <div class="col">
            <img style="border-radius: 10px; width: 50%"
                 src="statics/boy-avatar.png"
                 alt="head picture"
            >
            <div style="font-size: small">
              我的辅导
            </div>
          </div>
        </div>
      </div>
      <div class="col person">
        <div style="text-align: left; margin: 5px 20px; font-size: large">
          <b>我的发布</b>
        </div>
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NeedVerify from 'components/needVerify'

export default {
  components: {
    NeedVerify
  },
  data () {
    return {
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
    try {
      this.userMsg = JSON.parse(this.getUserDetailMsg)
    }
    catch (e) {
      console.log(e)
    }
  },
  methods: {

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
