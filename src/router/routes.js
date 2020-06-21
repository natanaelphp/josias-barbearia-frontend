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
  {
    path: '/appointments',
    name: 'appointments',
    component: () => import(/* webpackChunkName: "appointments" */ '../app/appointments/Index.vue')
  },
]