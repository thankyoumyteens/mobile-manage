<template>
  <div class="order-list">
    <el-table :data="orderList" stripe style="width: 100%">
      <el-table-column prop="orderNo" label="订单号" width="150"></el-table-column>
      <el-table-column label="商品">
        <template slot-scope="scope">
          <div class="order-item" v-for="(item,index) in scope.row.orderItemList" :key="index">
            <div class="goods-name">{{item.productName}}</div>
            <div class="goods-detail">{{item.detail}} x {{item.quantity}}</div>
          </div>
          <!--<el-button size="mini" @click="showItem(scope.$index, scope.row)">查看</el-button>-->
        </template>
      </el-table-column>
      <el-table-column prop="totalPrice" label="总价" width="100"></el-table-column>
      <el-table-column prop="statusMsg" label="状态" width="50"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" v-if="scope.row.status===20"
                     @click="orderSend(scope.$index, scope.row)">
            发货
          </el-button>
          <!--<el-button size="mini" v-if="scope.row.status===10" type="danger"-->
          <!--@click="orderCancel(scope.$index, scope.row)">-->
          <!--取消订单-->
          <!--</el-button>-->
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

  export default {
    data() {
      return {
        orderList: [],
        pageNum: 1,
        pageInfo: {
          pageSize: 10,
          total: 0,
          pages: 1
        }
      }
    },
    mounted() {
      this.getOrderList()
    },
    methods: {
      changePage(pageIndex) {
        this.pageNum = pageIndex
        this.getOrderList()
      },
      orderSend(index, row) {
        axios.post(path()['orderSend'] + '?orderNo=' + row.orderNo).then((response) => {
          let data = response.data
          if (data.status === 0) {
            this.$message({
              showClose: true,
              message: data.msg,
              type: 'success'
            })
            // 更新数据
            this.orderList[index].status = 40
            this.orderList[index].statusMsg = '已发货'
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
      orderCancel(index, row) {
        console.log(row)
      },
      showItem(index, row) {
        console.log(row)
      },
      getOrderList() {
        axios.post(path()['orderList'] + '?pageNum=' + this.pageNum).then((response) => {
          let data = response.data
          if (data.status === 0) {
            this.orderList = data.data.list
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
  .order-list
    .order-item
      border-bottom 1px solid #777
      .goods-name
        color #000
      .goods-detail
        color #ccc
</style>
