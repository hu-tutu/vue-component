import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import table from '../views/table.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/table',
    name: 'Home',
    component: Home
  },{
    path: '/',
    name: 'table',
    component: table
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
