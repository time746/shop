import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from 'components/Login'
import Home from 'components/Home'
import Welcome from 'components/Welcome'
import User from 'components/user/User'
import Rights from 'components/power/Rights'
import Roles from 'components/power/Roles'
import Cate from 'components/goods/Cate'
import Params from 'components/goods/Params'
import List from 'components/goods/List'
import Add from 'components/goods/Add'
import Order from 'components/order/Order'

Vue.use(VueRouter)


const routes = [{
    path: '',
    redirect: '/login',

  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {path: '/welcome',component: Welcome},
      {path: '/users',component: User},
      {path: '/rights',component: Rights},
      {path: '/roles',component: Roles},
      {path: '/categories',component: Cate},
      {path: '/params',component: Params},
      {path: '/goods',component: List},
      {path: '/goods/add',component: Add},
      {path: '/orders',component: Order},
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
    return;
  }
  const tokenstr = window.sessionStorage.getItem('token')
  if (!tokenstr) return next('/login')
  next()

})



export default router