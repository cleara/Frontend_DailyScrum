import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import DailyScrum from '../views/DailyScrum.vue'
import Navbar from '../views/layouts/Navbar.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    components: {default: Login}
  },
  {
    path: '/register',
    name: 'register',
    components: {default: Register}
  },
  {
    path: '/dailyscrum',
    name: 'dailyscrum',
    components:  {default:DailyScrum ,header: Navbar},
    meta: { 
      requiresAuth: true
  }
}
 
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router
