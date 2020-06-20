import Home from '../app/home/Home.vue'
import Login from '../app/auth/Login.vue'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/clients',
    name: 'Clients',
    component: () => import(/* webpackChunkName: "clients" */ '../app/clients/Index.vue')
  },
  {
    path: '/schedules',
    name: 'Schedules',
    component: () => import(/* webpackChunkName: "schedules" */ '../app/schedules/Index.vue')
  },
]