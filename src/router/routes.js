import Home from '../app/home/Home.vue'
import Login from '../app/auth/Login.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/clients',
    name: 'clients',
    component: () => import(/* webpackChunkName: "clients" */ '../app/clients/Index.vue')
  },
  // {
  //   path: '/clients/create',
  //   name: 'clients.create',
  //   component: () => import(/* webpackChunkName: "clients" */ '../app/clients/Create.vue')
  // },
  {
    path: '/schedules',
    name: 'schedules',
    component: () => import(/* webpackChunkName: "schedules" */ '../app/schedules/Index.vue')
  },
]