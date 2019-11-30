<template>
  <div class="q-pa-md" style="width: 100%">
    <input ref="content" type="file" accept="image/*"
           multiple='multiple' id='upload-file'
           @change='showImg' style='display:none' >

    <div class="col person">
      <div class="row wrap ">
        <div class="col-3" v-for="(item, index) in curls"
             :key="index" >
          <img style="object-fit: cover; border-radius: 10px; width: 90%; height: 100%"
               :src="item.url"
               alt="picture"
          >
        </div>
        <div class="col-3">
          <img style="object-fit: cover; border-radius: 10px; width: 90%; height: 100%"
               src="statics/upload.png" alt="upload"
               @click='bindEven'
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lrz from 'lrz'
export default {
  name: 'Report',
  data () {
    return {
      files: [],
      curls: []
    }
  },
  created () {
    this.initParams()
  },
  methods: {
    initParams () {
      this.curls = this.urls !== undefined ? this.urls : []
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
      console.log(this.curls)
    },
    showImg: function (e) {
      let files = e.target.files
      let file
      for (let i = 0; i < files.length; i++) {
        file = files[i]
        this.readFile(file)
        // console.log(file);
      }
    },
    bindEven () {
      this.$refs.content.click()
    }
  }
}
</script>

<style lang="stylus">
  .person
    border-radius 20px
    margin 10px
    padding 10px 0
    text-align center
</style>
