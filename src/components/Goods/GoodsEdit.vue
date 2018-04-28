<template>
  <div class="goods-edit">
    <div class="goods-info">
      {{goodsDetail.name}}
    </div>
    <el-table :data="propertiesList" stripe style="width: 100%">
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img class="table-img" :src="scope.row.mainImage">
        </template>
      </el-table-column>
      <el-table-column prop="text" label="规格"></el-table-column>
      <el-table-column prop="stock" label="库存" width="100"></el-table-column>
      <el-table-column prop="price" label="价格" width="100"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {path} from '@/commons/address.js'

  export default {
    data() {
      return {
        goodsDetail: {},
        propertiesList: []
      }
    },
    created() {
      this.getGoodsDetail()
    },
    methods: {
      getGoodsDetail() {
        let goodsId = this.$route.query.goodsId
        if (goodsId) {
          axios.post(path()['productionDetail'] + '?goodsId=' + goodsId).then((response) => {
            let data = response.data
            if (data.status === 0) {
              console.log(data)
              this.goodsDetail = data.data
              this.propertiesList = this.goodsDetail.propertiesList
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
    .table-img
      width 100px
      height 100px
</style>
