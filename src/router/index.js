import Vue from 'vue'
import Router from 'vue-router'
import NotFoundView from 'components/404.vue'
import Login from 'pages/login.vue'
import Home from 'pages/home'
import User from 'pages/user'
import Index from 'pages/index'
import Menu from 'pages/menu'
import Order from 'pages/order'
import Service from 'pages/service'
import Permission from 'pages/permission'
import Regional from 'pages/regional'
import Areamanager from 'pages/areamanager'
import City from 'pages/city'
import Authority from 'pages/authority'
import Carousel from 'pages/carousel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path:'/login',
      component: Login
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
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
          path:'/order',
          component:Order
        },
        {
          path: '/service',
          component: Service
        },
        {
          path:'/permission',
          component: Permission
        },
        {
          path: '/regional',
          component: Regional
        },
        {
          path:'area',
          component: Areamanager
        },
        {
          path: 'city',
          component: City
        },
        {
          path: 'authority',
          component: Authority
        },
        {
          path: '/carousel',
          component: Carousel
        },
        { path: '*', component: NotFoundView }
      ]
    },
  ]
})
