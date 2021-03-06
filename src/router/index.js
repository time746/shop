import VueRouter from 'vue-router'
import Vue from 'vue'
// import Login from 'components/Login'
// import Home from 'components/Home'
// import Welcome from 'components/Welcome'
// import User from 'components/user/User'
// import Rights from 'components/power/Rights'
// import Roles from 'components/power/Roles'
// import Cate from 'components/goods/Cate'
// import Params from 'components/goods/Params'
// import List from 'components/goods/List'
// import Add from 'components/goods/Add'
// import Order from 'components/order/Order'
// import Report from 'components/report/Report'


const Login = () => import(/* webpackChunkName: "group-foo" */ 'components/Login')
const Home = () => import(/* webpackChunkName: "group-foo" */ 'components/Home')
const Welcome = () => import(/* webpackChunkName: "group-foo" */ 'components/Welcome')
const User = () => import(/* webpackChunkName: "group-foo" */ 'components/user/User')
const Rights = () => import(/* webpackChunkName: "group-foo" */ 'components/power/Rights')
const Roles = () => import(/* webpackChunkName: "group-foo" */ 'components/power/Roles')
const Cate = () => import(/* webpackChunkName: "group-foo" */ 'components/goods/Cate')
const Params = () => import(/* webpackChunkName: "group-foo" */ 'components/goods/Params')
const List = () => import(/* webpackChunkName: "group-foo" */ 'components/goods/List')
const Add = () => import(/* webpackChunkName: "group-foo" */ 'components/goods/Add')
const Order = () => import(/* webpackChunkName: "group-foo" */ 'components/order/Order')
const Report = () => import(/* webpackChunkName: "group-foo" */ 'components/report/Report')




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
      {path: '/reports',component: Report},
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