<template>
  <div id="app">
    <el-container direction="vertical">
      <el-header>
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
              <el-dropdown-item command="logout">退出</el-dropdown-item>
              <el-dropdown-item>狮子头111111111111111111</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item disabled>双皮奶</el-dropdown-item>
              <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container direction="horizontal">
        <el-aside>
          <el-menu
            default-active="2"
            @select="menuSelect">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
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
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: null
      }
    },
    created() {
    },
    methods: {
      menuSelect(index) {
        console.log(index)
      },
      userInfoCommand(command) {
        console.log(command)
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
