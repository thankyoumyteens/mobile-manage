<template>
  <div class="login">
    <div class="login-wrapper">
      <div class="login-item">
        <label class="login-label">用户名</label>
        <el-input v-model="form.username"></el-input>
      </div>
      <div class="login-item">
        <label class="login-label">密码</label>
        <el-input type="password" v-model="form.password"></el-input>
      </div>
      <div class="login-item">
        <router-link class="login-link" to="register">注册卖家账号</router-link>
        <el-button type="primary" :loading="isLoading">登陆</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        isLoading: false,
        form: {
          username: '',
          password: ''
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .login
    width 100%
    height 100%
    .login-wrapper
      position absolute
      left 50%
      top 50%
      transform translateY(-50%)
      .login-item
        width 300px
        margin 15px auto
        display flex
        .login-label
          width 100px
        .el-input
          flex 1
        .login-link
          display flex
          align-items center
          flex 1
          color #409eff
          text-decoration none
        .el-button
          width 100px
</style>
