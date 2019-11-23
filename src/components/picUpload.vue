<template>
  <div class="q-pa-md">
    <div>123</div>
  </div>
</template>
<script>
// MyUploader.js
import { QUploaderBase } from 'quasar'

export default {
  name: 'MyUploader',

  mixins: [ QUploaderBase ],

  computed: {
    // [REQUIRED]
    // we're working on uploading files
    isUploading () {
      // return <Boolean>
    },

    // [optional]
    // shows overlay on top of the
    // uploader signaling it's waiting
    // on something (blocks all controls)
    isBusy () {
      // return <Boolean>
    }
  },

  methods: {
    // [REQUIRED]
    // abort and clean up any process
    // that is in progress
    abort () {
      // ...
    },

    // [REQUIRED]
    upload () {
      if (this.canUpload === false) {
        return
      }

      // ...
    }
  }
}
</script>
