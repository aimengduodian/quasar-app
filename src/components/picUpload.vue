<template>
  <div class="q-pa-md">
    <div class="a-upload">
      <input class="upload-file" type="file" accept="image/*"
             multiple="multiple" id="file" @change="showImg">
      <p>点击上传</p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showDel: false,
      curls: [],
      ckey: 'url',
      files: [],
      pressFlag: false // 判断是否为按压屏幕
    }
  },
  props: {
    urls: {
      type: Array,
      default: null
    },
    urlKey: {
      type: String,
      default: ''
    }
  },
  created () {
    this.initParams()
  },
  watch: {
    'urls': function () {
      this.changeUrlToBlob(this.urls)
    }
  },
  methods: {
    fShowDel () {
      this.showDel = !this.showDel
      this.pressFlag = true
      // console.log(e)
      // e.target.stopPropagation;
    },
    initParams () {
      // this.curls = this.urls != undefined ? this.urls : [];
      this.curls = []
      this.ckey = (this.urlKey !== undefined) ? this.urlKey : 'url'
    },
    showImg: function (obj) {
      Object.keys(obj.target.files).forEach(key => {
        const item = obj.target.files[key]
        this.readFile(item)
      })
    },
    delAll () {
      this.showDel = false
      this.files = []
      this.curls = []
    },
    readFile: function (file) {
      if (file.size > 5242880) {
        alert('照片不能大于5M')
        return
      }
      this.files.push(file)
      const data = {
        FileName: file.name.substr(0, file.name.lastIndexOf('.'))
      }

      const reader = new FileReader()
      reader.vue = this
      reader.readAsDataURL(file)
      reader.onload = function () {
        data[this.ckey] = this.result
        this.curls.push(data)
      }
    },
    showImagePreview: function (url) {
      if (this.pressFlag === true) {
        this.pressFlag = false
        return
      }
      this.$createImagePreview({
        imgs: [url]
      }).show()
    },
    delImg (item) {
      const _index = this.curls.indexOf(item)
      this.curls.splice(_index, 1)
      this.files.splice(_index, 1)
    },
    bindEven () {
      // ('#upload-file').click()
    },
    /*
     * 将img中url改为blob格式
     * @param url
     * */
    changeUrlToBlob (url) {
      for (let i = 0; i < url.length; i++) {
        this.loadImageToBlob(url[i].url, blobFile => {
          return blobFile
          // let fileReader = new FileReader()
          // fileReader.readAsDataURL(blobFile)
          // fileReader.onload = function () {
          //   // 这里输出的数据放到url里能生成图片
          //   console.log(this.result)
          //   // 新建对象
          //   // console.log(obj);
          // }
        })
      }
    },
    /*
     * 向服务器请求图片数据
     * @param url
     * @param callback
     * @returns {boolean}
     */
    loadImageToBlob (url, callback) {
      if (!url || !callback) {
        return false
      }
      const xhr = new XMLHttpRequest()
      xhr.responseType = 'blob'
      xhr.onload = function () {
        //  注意这里的this.response 是一个blob对象 就是文件对象
        // blob对象转file对象
        const FileName = 'abc.jpg'
        const contentType = this.response.type
        const file = new File([this.response], FileName, { type: contentType, lastModified: Date.now() })
        this.readFile(file)
        callback(Number(this.status) === 200 ? this.response : false)
      }
      xhr.open('get', url, true)
      xhr.send()
      return true
    }
  }
}
</script>

<style lang="stylus">
  .a-upload
    margin-top: 20px
    position: relative
    display: inline-block
    background: #D0EEFF
    border: 1px solid #99D3F5
    border-radius: 4px
    padding: 4px 12px
    overflow: hidden
    color: #1E88C7
    text-decoration: none
    text-indent: 0
    line-height: 20px

  .upload-file
    position: absolute
    font-size: 100px
    right: 0
    top: 0
    opacity: 0
    cursor: pointer

  .upload-file:hover
    color: #444
    background: #eee
    border-color: #ccc
    text-decoration: none

</style>
