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
import Order from 'pages/order/order' //订单管理页面
import Permission from 'pages/permission' //角色管理页面
import Regional from 'pages/regional' //大区经理管理页面
import Service from 'pages/service/service' //服务管理页面
import User from 'pages/user' //用户管理页面
import Log from 'pages/log' //日志管理页面
import NotFoundView from 'components/404.vue' //404页面
import { getStore } from "config/utils";
import { menuList } from "../mock/dataBase";
import { ApiDataModule, CODE_OK, CODE_ERR } from "config/axios.js";



Vue.use(Router)

const routerConfig = [{
    path: '',
    redirect: '/user'
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
  let a = menuList.map((item,index)=>{
    console.log(item)
    let admininfo = JSON.parse(getStore('ADMININFO'));
    let status = false;
    if(item.children.length>0){
      item.children.map((item2,index2)=>{
        if (item2.href == route.path) {
          alert(route.path);
          ApiDataModule('GETAUTH', { role_id: admininfo.role_id }).then(res => {
            if (res.indexOf(item2.code, 0) > 0) {
              status = true;
            }
          })
        }
      })
      return status;
    }
    if (item.href == route.path){
      alert(route.path)
    }
  })
  console.log(a,'asfdasd')
  if (route.path !== '/login' && getStore('ADMININFO') == null && a) {
    next({
      path: '/login',
    })
  } else {
    next()
  }
})

export default routers;
