import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login'
import Register from '@/components/Login/Register'
import GoodsList from '@/components/Goods/GoodsList'
import GoodsEdit from '@/components/Goods/GoodsEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/goods_list',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/goods_edit',
      name: 'GoodsEdit',
      component: GoodsEdit
    }
  ]
})
