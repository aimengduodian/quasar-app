
/*
 * 向服务器请求图片数据
 * @param url
 * @param callback
 * @returns {boolean}
 */
async function loadImageToBlob (url, callback) {
  if (!url || !callback) {
    return false
  }
  const xhr = new XMLHttpRequest()
  xhr.responseType = 'blob'
  xhr.onload = await function () {
    // 注意这里的this.response 是一个blob对象 就是文件对象
    // blob对象转file对象
    const FileName = 'abc.jpg'
    const contentType = this.response.type
    const file = new File([this.response], FileName, { type: contentType, lastModified: Date.now() })
    // this.readFile(file)
    callback(Number(this.status) === 200 ? file : false)
  }
  xhr.open('get', url, true)
  xhr.send()
  return true
}

/*
 * 将img中url改为blob格式
 * @param url
 * */
function changeUrlToBlob (url) {
  const arr = []
  for (let i = 0; i < url.length; i++) {
    loadImageToBlob(url[i].url, blobFile => {
      arr.push(blobFile)
      return blobFile
      // const fileReader = new FileReader()
      // fileReader.readAsDataURL(blobFile)
      // fileReader.onload = function () {
      //   // 这里输出的数据放到url里能生成图片
      //   console.log(111)
      //   console.log(this.result)
      //   // 新建对象
      //   console.log(obj)
      // }
    })
  }
  return arr
}

export default {
  changeUrlToBlob
}
