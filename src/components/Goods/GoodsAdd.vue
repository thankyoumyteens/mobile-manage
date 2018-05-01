<template>
  <div class="goods-add">
    <div class="goods-add-item">
      <div class="text-title">分类</div>
      <el-select v-model="categoryId" placeholder="请选择">
        <el-option
          v-for="item in categoryList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <div class="goods-add-item">
      <div class="text-title">商品名称</div>
      <el-input v-model="name"></el-input>
    </div>
    <div class="goods-add-item">
      <div class="text-title">商品副标题</div>
      <el-input v-model="subtitle"></el-input>
    </div>
    <div v-loading="imageLoading" element-loading-text="请稍等，图片上传中">
      <div class="goods-add-item">
        <div class="text-title">商品主图</div>
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imgUrl" :src="imgUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="goods-add-item">
        <div class="text-title">商品图片</div>
        <el-upload
          class="upload-demo"
          :action="uploadUrl"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :before-upload="beforeAvatarUpload"
          :file-list="fileList2"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg文件</div>
        </el-upload>
      </div>
    </div>
    <div class="add-button-wrapper">
      <el-button type="primary" @click="addGoods">完成</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {path} from '@/commons/address.js'

  export default {
    created() {
      this.getCategoryList()
      this.uploadUrl = path()['imageUpload']
    },
    data() {
      return {
        imageLoading: false,
        categoryList: [],
        categoryId: -1,
        name: '',
        subtitle: '',
        uploadUrl: '',
        imgUrl: '',
        imgUri: '',
        fileList2: []
      }
    },
    methods: {
      addGoods() {
        let subImages = ''
        for (let index in this.fileList2) {
          let item = this.fileList2[index]
          subImages += item.uri + ','
        }
        let params = {
          categoryId: this.categoryId,
          name: this.name,
          subtitle: this.subtitle,
          mainImage: this.imgUri,
          subImages: subImages
        }
        console.log(params)
        axios.post(path()['addGoods'], params).then((response) => {
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
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePreview(file) {
        console.log(file)
      },
      handleSuccess(res, file) {
        let imgUrl = res.data.url
        let imgUri = res.data.uri
        let item = {
          name: imgUri,
          url: imgUrl,
          uri: imgUri
        }
        this.fileList2.push(item)
        console.log(this.fileList2)
        this.imageLoading = false
      },
      handleAvatarSuccess(res, file) {
        this.imgUrl = res.data.url
        this.imgUri = res.data.uri
        this.imageLoading = false
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        this.imageLoading = true
        return isJPG && isLt2M
      },
      getCategoryList() {
        axios.post(path()['categoryList']).then((response) => {
          let data = response.data
          if (data.status === 0) {
            this.categoryList = data.data
            if (this.categoryList.length > 0) {
              this.categoryId = this.categoryList[0].id
            }
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
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .goods-add
    .avatar-uploader
      .el-upload
        border 1px dashed #d9d9d9
        border-radius 6px
        cursor pointer
        position relative
        overflow hidden
        &:hover
          border-color #409EFF
        .avatar-uploader-icon
          font-size 28px
          color #8c939d
          width 178px
          height 178px
          line-height 178px
          text-align center
        .avatar
          width 178px
          height 178px
          display block
    .add-button-wrapper
      margin 1em 0
</style>
