<template>
  <div>
    <input ref="content" type="file" accept=".jpg, image/*"
           multiple='multiple' @change='showImg' style='display:none' >
    <div class="row wrap">
      <div class="col-3" v-for="(item, index) in curls" :key="index" >
        <q-img
          :src="item.url"
          class="imgStyle"
          spinner-color="primary"
        >
          <q-btn flat round size="xs" @click="delImg(item)">
            <q-icon size="xs" name="delete" />
          </q-btn>
          <div v-if="index === firstImg" class="absolute-bottom text-center">
            <q-badge floating color="teal">首页</q-badge>
          </div>
        </q-img>
      </div>
      <div class="col-3" v-if="curls.length < 8">
        <img class="imgStyle" src="statics/upload.png"
             alt="upload" @click='bindEven'>
      </div>
    </div>
  </div>
</template>

<script>
import lrz from 'lrz'
export default {
  data () {
    return {
      firstImg: 0,
      files: [],
      curls: []
    }
  },
  props: {
    urls: {
      type: String,
      default: ''
    }
  },
  created () {
    this.initParams()
  },
  watch: {
    files: {
      handler (n, o) {
        let fileList = []
        fileList = JSON.parse(JSON.stringify(n))
        [fileList[0], fileList[this.firstImg]] = [fileList[this.firstImg], fileList[0]]
        this.$emit('filesArr', fileList)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    initParams () {
      this.changeUrlToBlob(JSON.parse(this.urls))
    },
    async readFile (file) {
      if (file.size > 5242880) {
        this.$q.notify('照片不能大于5M')
        return
      }
      this.files.push(file)
      const data = {
        FileName: file.name.substr(0, file.name.lastIndexOf('.'))
      }
      await lrz(file).then(function (res) {
        data.url = res.base64
      })
      this.curls.push(data)
    },
    setImgFirstPage (item) {
      this.firstImg = this.curls.indexOf(item)
    },
    delImg (item) {
      const itemIndex = this.curls.indexOf(item)
      this.curls.splice(itemIndex, 1)
      this.files.splice(itemIndex, 1)
    },
    showImg: function (e) {
      let files = e.target.files
      for (let i = 0; i < files.length; i++) {
        this.readFile(files[i])
      }
    },
    bindEven () {
      this.$refs.content.click()
    },
    /*
     * 向服务器请求图片数据
     * @param url
     * @param callback
     * @returns {boolean}
     */
    async loadImageToBlob (url, callback) {
      if (!url || !callback) {
        return false
      }
      const xhr = new XMLHttpRequest()
      xhr.responseType = 'blob'
      xhr.onload = await function () {
        // 注意这里的this.response 是一个blob对象 就是文件对象
        // blob对象转file对象
        const FileName = url
        const contentType = this.response.type
        const file = new File([this.response], FileName, { type: contentType, lastModified: Date.now() })
        // this.readFile(file)
        callback(Number(this.status) === 200 ? file : false)
      }
      xhr.open('get', url, true)
      xhr.send()
      return true
    },
    /*
     * 将img中url改为blob格式
     * @param url
     * */
    changeUrlToBlob (url) {
      for (let i = 0; i < url.length; i++) {
        this.loadImageToBlob(url[i], blobFile => {
          this.readFile(blobFile)
        })
      }
    }
  }
}
</script>

<style lang="stylus">
  .imgStyle
    object-fit: cover
    margin 5px
    border-radius: 10px
    width: 90%
    height: 20vw
</style>
