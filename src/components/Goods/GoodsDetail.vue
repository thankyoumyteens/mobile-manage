<template>
  <div class="goods-detail">
    <quill-editor v-model="detail.text" @change="change"></quill-editor>
    <el-button type="primary" @click="addDetail">完成</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {path} from '@/commons/address.js'
  import {quillEditor} from 'vue-quill-editor'

  export default {
    components: {
      quillEditor
    },
    mounted() {
      this.getGoodsDetail()
    },
    data() {
      return {
        detail: {}
      }
    },
    methods: {
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
