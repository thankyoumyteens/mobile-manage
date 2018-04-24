<template>
  <div class="register">
    <div class="login-wrapper">
      <div class="login-item">
        <label class="login-label">用户名</label>
        <el-input v-model="form.username"></el-input>
      </div>
      <div class="login-item">
        <label class="login-label">昵称</label>
        <el-input v-model="form.nickname"></el-input>
      </div>
      <div class="login-item">
        <label class="login-label">密码</label>
        <el-input type="password" v-model="form.password"></el-input>
      </div>
      <div class="login-item">
        <label class="login-label">确认密码</label>
        <el-input type="password" v-model="form.password2"></el-input>
      </div>
      <div class="login-item">
        <label class="login-label">邮箱</label>
        <el-input v-model="form.email"></el-input>
      </div>
      <div class="login-item">
        <label class="login-label">手机号码</label>
        <el-input type="number" v-model="form.phone"></el-input>
      </div>
      <div class="login-item">
        <router-link class="login-link" to="login">已有账号登陆</router-link>
        <el-button type="primary" :loading="isLoading" :disabled="isDisabled" @click="doRegister">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import {path} from '@/commons/address.js'

  export default {
    data() {
      return {
        isLoading: false,
        isDisabled: false,
        form: {
          username: '',
          password: '',
          password2: '',
          nickname: '',
          email: '',
          phone: ''
        }
      }
    },
    methods: {
      doRegister() {
        if (this.form.username === '' || this.form.password === '') {
          this.$message({
            showClose: true,
            message: '用户名或密码不能为空',
            type: 'error'
          })
          return false
        }
        if (this.form.password !== this.form.password2) {
          this.$message({
            showClose: true,
            message: '两次输入的密码不一致',
            type: 'error'
          })
          return false
        }
        this.isLoading = true
        axios.post(path()['register'], {
          username: this.form.username,
          password: this.form.password,
          email: this.form.email,
          phone: this.form.phone,
          nickname: this.form.nickname
        }).then((response) => {
          this.isLoading = false
          let data = response.data
          if (data.status === 0) {
            this.isDisabled = true
            this.$message({
              showClose: true,
              message: data.msg,
              type: 'success'
            })
            setTimeout(() => {
              this.isDisabled = false
              this.$router.push('/login')
            }, 3000)
          } else {
            this.$message({
              showClose: true,
              message: data.msg,
              type: 'error'
            })
          }
        }).catch((error) => {
          this.isLoading = false
          console.log(error)
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .register
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
