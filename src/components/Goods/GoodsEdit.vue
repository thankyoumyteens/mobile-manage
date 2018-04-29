<template>
  <div class="goods-edit">
    <div class="goods-info">
      {{goodsDetail.name}}
    </div>
    <div class="add-button-wrapper">
      <el-button type="primary" @click="addProperty">新增</el-button>
    </div>
    <el-table :data="propertiesList" stripe style="width: 100%">
      <el-table-column label="图片" width="150">
        <template slot-scope="scope">
          <img class="table-img" :src="scope.row.mainImage">
        </template>
      </el-table-column>
      <el-table-column prop="textStr" label="规格"></el-table-column>
      <el-table-column prop="stock" label="库存" width="100"></el-table-column>
      <el-table-column prop="price" label="价格" width="100"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-card class="box-card edit-wrapper" v-show="cardShowStatus">
      <div slot="header" class="clearfix">
        <span>编辑</span>
        <el-button style="float: right; padding: 3px 5px" @click="hideCard" type="text">取消</el-button>
        <el-button style="float: right; padding: 3px 5px" @click="updateProperties()" type="text">完成</el-button>
      </div>
      <div class="text item">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imgUrl" :src="imgUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="text-add" v-show="showAddBar">
          <el-input v-model="addKey"></el-input>
          <el-input v-model="addValue"></el-input>
          <el-button type="primary" @click="addNewProperty">添加</el-button>
        </div>
        <div class="text">
          <div v-for="(item,index) in propertyKeys" :key="index">
            <div class="text-title">{{item}}</div>
            <el-input v-model="propertyValues[index]"></el-input>
          </div>
        </div>
        <div class="price">
          <div class="price-title">单价</div>
          <div class="price-value">
            <el-input v-model="price" type="number"></el-input>
          </div>
        </div>
        <div class="stock">
          <div class="stock-title">库存</div>
          <div class="stock-value">
            <el-input v-model="stock" type="number"></el-input>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {path} from '@/commons/address.js'
  import {remove} from '@/commons/util.js'

  export default {
    data() {
      return {
        goodsDetail: {},
        propertiesList: [],
        propertiesId: -1,
        propertyKeys: [],
        propertyValues: [],
        addKey: '',
        addValue: '',
        price: '',
        stock: '',
        uploadUrl: '',
        imgUrl: '',
        imgUri: '',
        showAddBar: false,
        cardShowStatus: false
      }
    },
    created() {
      this.getGoodsDetail()
      this.uploadUrl = path()['imageUpload']
    },
    methods: {
      updateProperties() {
        let text = '{'
        for (let index in this.propertyKeys) {
          let key = this.propertyKeys[index]
          let value = this.propertyValues[index]
          text += '"' + key + '"' + ':' + '"' + value + '"' + ','
        }
        text = text.substring(0, text.length - 1)
        text += '}'
        let params = {
          id: this.propertiesId,
          goodsId: this.goodsDetail.goodsId,
          mainImage: this.imgUri,
          price: this.price,
          stock: this.stock,
          text: text
        }
        axios.post(path()['updateProperties'], params).then((response) => {
          let data = response.data
          if (data.status === 0) {
            this.hideCard()
            this.$message({
              showClose: true,
              message: data.msg,
              type: 'success'
            })
            // 更新数据
            this.getGoodsDetail()
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
      addProperty() {
        this.hideCard()
        if (this.propertiesList.length > 0) {
          let property = this.propertiesList[0]
          for (let key in property.text) {
            if (property.text.hasOwnProperty(key)) {
              this.propertyKeys.push(key)
              this.propertyValues.push('')
            }
          }
        } else {
          // todo 第一次添加规格
          this.showAddBar = true
        }
        this.price = ''
        this.stock = ''
        this.imgUrl = ''
        this.imgUri = ''
        this.cardShowStatus = true
      },
      addNewProperty() {
        this.propertyKeys.push(this.addKey)
        this.propertyValues.push(this.addValue)
      },
      hideCard() {
        this.showAddBar = false
        this.propertiesId = -1
        this.cardShowStatus = false
        this.propertyKeys = []
        this.propertyValues = []
        this.price = ''
        this.stock = ''
        this.imgUrl = ''
        this.imgUri = ''
      },
      handleEdit(index, row) {
        this.hideCard()
        this.propertiesId = row.propertiesId
        for (let key in row.text) {
          if (row.text.hasOwnProperty(key)) {
            let value = row.text[key]
            this.propertyKeys.push(key)
            this.propertyValues.push(value)
          }
        }
        this.price = row.price
        this.stock = row.stock
        this.imgUrl = row.mainImage
        this.imgUri = this.imgUrl.substring(this.imgUrl.lastIndexOf('/') + 1)
        this.cardShowStatus = true
      },
      handleDelete(index, row) {
        axios.get(path()['propertyDelete'] + '?propertiesId=' + row.propertiesId).then((response) => {
          let data = response.data
          if (data.status === 0) {
            this.$message({
              showClose: true,
              message: data.msg,
              type: 'success'
            })
            // 更新数据
            remove(this.propertiesList, index)
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
      handleAvatarSuccess(res, file) {
        this.imgUrl = res.data.url
        this.imgUri = res.data.uri
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
        return isJPG && isLt2M
      },
      getGoodsDetail() {
        let goodsId = this.$route.query.goodsId
        if (goodsId) {
          axios.post(path()['productionDetail'] + '?goodsId=' + goodsId).then((response) => {
            let data = response.data
            if (data.status === 0) {
              this.goodsDetail = data.data
              this.propertiesList = this.goodsDetail.propertiesList
              if (!this.propertiesList) {
                this.propertiesList = []
              }
              // 处理json数据
              for (let i = 0; i < this.propertiesList.length; i++) {
                let item = this.propertiesList[i]
                item.text = JSON.parse(item.text)
                item.textStr = ''
                for (let k in item.text) {
                  let v = item.text[k]
                  item.textStr += k + ':' + v + ' '
                }
              }
            } else {
              console.log(data.msg)
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
  .goods-edit
    position relative
    .add-button-wrapper
      margin 1em 0
    .table-img
      width 100px
      height 100px
    .edit-wrapper
      position fixed
      top 70px
      width 500px
      left 50%
      transform translateX(-50%)
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
</style>
