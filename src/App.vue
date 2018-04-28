<template>
  <div id="app">
    <el-container direction="vertical">
      <el-header>
        <!--用户 start-->
        <div class="user-info" v-if="!user">
          <router-link tag="div" to="/login" class="user-info-title">登陆</router-link>
        </div>
        <div class="user-info" v-if="user">
          <el-dropdown trigger="click" @command="userInfoCommand">
            <span class="el-dropdown-link">
              <span class="user-info-title">{{user['nickname']}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="userInfo">账号管理</el-dropdown-item>
              <el-dropdown-item divided command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!--用户 end-->
      </el-header>
      <el-container direction="horizontal">
        <el-aside>
          <el-menu
            default-active="0"
            @select="menuSelect">
            <el-submenu index="">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item-group>
                <!--<template slot="title">分组一</template>-->
                <el-menu-item index="goods_list">商品列表</el-menu-item>
                <el-menu-item index="goods_add">添加商品</el-menu-item>
              </el-menu-item-group>
              <!--<el-menu-item-group title="分组2">-->
              <!--<el-menu-item index="1-3">选项3</el-menu-item>-->
              <!--</el-menu-item-group>-->
              <!--<el-submenu index="1-4">-->
              <!--<template slot="title">选项4</template>-->
              <!--<el-menu-item index="1-4-1">选项1</el-menu-item>-->
              <!--</el-submenu>-->
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view @login="loginSuccess"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import axios from 'axios'
  import {path} from '@/commons/address.js'

  export default {
    data() {
      return {
        user: null
      }
    },
    created() {
      this.getUserInfo()
    },
    methods: {
      getUserInfo() {
        axios.post(path()['userInfo']).then((response) => {
          let data = response.data
          if (data.status === 0) {
            this.user = data.data
          } else {
            console.log(data.msg)
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      logout() {
        axios.post(path()['logout']).then((response) => {
          let data = response.data
          if (data.status === 0) {
            this.user = null
            this.$message({
              showClose: true,
              message: '已退出登陆',
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
      loginSuccess(user) {
        this.user = user
      },
      menuSelect(index) {
        this.$router.push(index)
      },
      userInfoCommand(command) {
        console.log(command)
        switch (command) {
          case 'logout':
            this.logout()
            break
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    overflow-x hidden
    .el-header
      background #409EFF
      position relative
      .user-info
        position absolute
        right 20px
        top 50%
        transform translateY(-50%)
        cursor pointer
        .user-info-title
          color #fff
        .el-icon-arrow-down
          color #fff
</style>
