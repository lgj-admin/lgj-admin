import Vue from 'vue'
import Router from 'vue-router'
import NotFoundView from 'components/404.vue'
import Home from 'pages/home'
import User from 'pages/user'
import Index from 'pages/index'
import Menu from 'pages/menu'
import Order from 'pages/order'
import Service from 'pages/service'
import Carousel from 'pages/carousel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/home'
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
          path: '/carousel',
          component: Carousel
        },
        { path: '*', component: NotFoundView }
      ]
    },
  ]
})
