<template>
  <div class="goods-detail">
    <div v-loading="imageLoading"
         element-loading-text="请稍等，图片上传中">
      <quill-editor v-model="detail.text" ref="newEditor" @change="change"></quill-editor>
      <!-- 文件上传input 将它隐藏-->
      <el-upload style="display:none" :action="uploadUrl" :show-file-list="false" :before-upload='newEditorbeforeupload'
                 :on-success='newEditorSuccess'
                 ref="uniqueId" id="uniqueId">
      </el-upload>
      <el-button type="primary" @click="addDetail">完成</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {path} from '@/commons/address.js'
  import {quillEditor} from 'vue-quill-editor'
  import Quill from 'quill'

  export default {
    components: {
      quillEditor
    },
    created() {
      this.uploadUrl = path()['imageUpload']
    },
    mounted() {
      this.getGoodsDetail()
      let imgHandler = async function (state) {
        if (state) {
          let fileInput = document.querySelector('#uniqueId input') // ElementUI隐藏的file元素
          fileInput.click() // 触发上传事件
        }
      }
      this.$refs.newEditor.quill.getModule('toolbar').addHandler('image', imgHandler)
    },
    data() {
      return {
        imageLoading: false,
        uploadUrl: '',
        detail: {}
      }
    },
    methods: {
      newEditorbeforeupload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('上传图片只能是JPG格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过2MB!')
        }
        if (isJPG && isLt2M) this.imageLoading = true
        return isJPG && isLt2M
      },
      // 上传图片回调
      newEditorSuccess(response, file, fileList) {
        if (response.status === 0) {
          this.addImgRange = this.$refs.newEditor.quill.getSelection()
          this.$refs.newEditor.quill.insertEmbed(this.addImgRange != null ? this.addImgRange.index : 0, 'image', response.data.url, Quill.sources.USER)
          this.imageLoading = false
        }
      },
      addDetail() {
        let params = {
          goodsId: this.$route.query.goodsId,
          text: this.detail.text
        }
        axios.post(path()['updateGoodsDetail'], params).then((response) => {
          let data = response.data
          if (data.status === 0) {
            this.$message({
              showClose: true,
              message: data.msg,
              type: 'success'
            })
          } else {
            this.$message({
              showClose: true,
              message: data.msg,
              type: 'error'
            })
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      change() {
        console.log(this.detail.text)
      },
      getGoodsDetail() {
        let goodsId = this.$route.query.goodsId
        if (goodsId) {
          axios.post(path()['goodsDetail'] + '?goodsId=' + goodsId).then((response) => {
            let data = response.data
            if (data.status === 0) {
              this.detail = data.data
            } else {
              this.$message({
                showClose: true,
                message: data.msg,
                type: 'error'
              })
            }
          }).catch((error) => {
            console.log(error)
          })
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
