<template>
  <div class="goods-list">
    <el-table :data="goodsList" stripe style="width: 100%">
      <el-table-column prop="categoryName" label="分类" width="100"></el-table-column>
      <el-table-column prop="name" label="商品名"></el-table-column>
      <el-table-column prop="subtitle" label="副标题"></el-table-column>
      <el-table-column prop="price" label="价格" width="100"></el-table-column>
      <el-table-column prop="statusMsg" label="状态" width="50"></el-table-column>
      <el-table-column label="操作" width="350">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
          <el-button size="mini" @click="handleSale(scope.$index, scope.row)">上/下架</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next"
                   @current-change="changePage"
                   :page-size="pageInfo.pageSize"
                   :page-count="pageInfo.pages"
                   :total="pageInfo.total">
    </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {path} from '@/commons/address.js'
  import {remove} from '@/commons/util.js'

  export default {
    data() {
      return {
        goodsList: [],
        pageNum: 1,
        pageInfo: {
          pageSize: 10,
          total: 0,
          pages: 1
        }
      }
    },
    mounted() {
      this.getGoodsList()
    },
    methods: {
      changePage(pageIndex) {
        this.pageNum = pageIndex
        this.getGoodsList()
      },
      handleSale(index, row) {
        let status = row.status
        let status2 = -1
        let statusMsg = ''
        let url = ''
        if (status === 1) {
          url = path()['productionOff']
          status2 = 2
          statusMsg = '下架'
        } else if (status === 2) {
          url = path()['productionOn']
          status2 = 1
          statusMsg = '在售'
        }
        axios.post(url + '?goodsId=' + row.goodsId).then((response) => {
          let data = response.data
          if (data.status === 0) {
            this.$message({
              showClose: true,
              message: data.msg,
              type: 'success'
            })
            // 更新数据
            this.goodsList[index].status = status2
            this.goodsList[index].statusMsg = statusMsg
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
      handleEdit(index, row) {
        this.$router.push({
          name: 'GoodsEdit',
          query: {goodsId: row.goodsId}
        })
      },
      handleDetail(index, row) {
        this.$router.push({
          name: 'GoodsDetail',
          query: {goodsId: row.goodsId}
        })
      },
      handleDelete(index, row) {
        axios.post(path()['productionDelete'] + '?goodsId=' + row.goodsId).then((response) => {
          let data = response.data
          if (data.status === 0) {
            this.$message({
              showClose: true,
              message: data.msg,
              type: 'success'
            })
            // 更新数据
            remove(this.goodsList, index)
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
      getGoodsList() {
        axios.post(path()['productionList'] + '?pageNum=' + this.pageNum).then((response) => {
          let data = response.data
          if (data.status === 0) {
            this.goodsList = data.data.list
            this.pageInfo = data.data
            this.pageInfo.list = null
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
  .goods-list
    .el-pagination
      margin 1em 0
      width 100%
      text-align center
</style>
