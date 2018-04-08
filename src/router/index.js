import Vue from 'vue'
import Router from 'vue-router'
import Authority from 'pages/authority' //权限管理页面
import Areamanager from 'pages/areamanager' //区域经理管理页面
import Answer from 'pages/answer' //客服问答管理页面
import City from 'pages/city' //城市管理页面
import Customer from 'pages/customer' //客服管理
import Companyinfo from 'pages/companyinfo' //公司信息管理页面
import Comment from 'pages/comment' //评价管理页面
import Carousel from 'pages/carousel' //轮播图管理页面
import Home from 'pages/home' //员工管理页面
import Index from 'pages/index'
import Login from 'pages/login.vue' //登录页面
import Menu from 'pages/menu' //菜单管理页面
import Order from 'pages/order' //订单管理页面
import Permission from 'pages/permission' //角色管理页面
import Regional from 'pages/regional' //大区经理管理页面
import Service from 'pages/service' //服务管理页面
import User from 'pages/user' //用户管理页面
import Log from 'pages/log' //日志管理页面
import NotFoundView from 'components/404.vue' //404页面

Vue.use(Router)

const routerConfig = [{
    path: '',
    redirect: '/home'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    name: 'Index',
    component: Index,
    children: [{
        path: '/home',
        component: Home
      },
      {
        path: '/user',
        component: User
      },
      {
        path: '/menu',
        component: Menu
      },
      {
        path: '/order',
        component: Order
      },
      {
        path: '/service',
        component: Service
      },
      {
        path: '/permission',
        component: Permission
      },
      {
        path: '/regional',
        component: Regional
      },
      {
        path: '/area',
        component: Areamanager
      },
      {
        path: '/city',
        component: City
      },
      {
        path: '/authority',
        component: Authority
      },
      {
        path: '/companyinfo',
        component: Companyinfo
      },
      {
        path: '/comment',
        component: Comment
      },
      {
        path: '/log',
        component: Log
      },
      {
        path: '/carousel',
        component: Carousel
      },
      {
        path: '/customer',
        component: Customer
      },
      {
        path: '/answer',
        component: Answer
      },
      {
        path: '*',
        component: NotFoundView
      }
    ]
  },
]


const routers = new Router({
  routes: routerConfig,
})

routers.beforeEach((route, redirect, next) => {
  if (route.path !== '/login') {
    next({
      path: '/login',
    })
  } else {
    next()
  }
})

export default routers;
