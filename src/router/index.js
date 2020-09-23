import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/lvyou',
    name: 'Lvyou',
    component: () => import('../views/Lvyou.vue'),
    meta: {
      keepAlive: true
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
