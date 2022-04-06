import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MyLogin from '../views/MyLogin.vue'

import MyAdminHome from '../views/MyAdminHome.vue'
import MyUserHome from '../views/MyUserHome.vue'

const routes = [
  {
    path: '/MyLogin',
    name: 'MyLogin',
    component: MyLogin
  },
  {
    path: '/MyUserHome',
    name: 'MyUserHome',
    component: MyUserHome
  },
  {
    path: '/MyAdminHome',
    name: 'MyAdminHome',
    component: MyAdminHome
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
