import Vue from 'vue'
import VueRouter from 'vue-router'
import dashboard from '../views/dashboard.vue'
import Login from '../components/Login.vue'
import Home from '../views/Home.vue'
import store from '../store'
Vue.use(VueRouter)

// const ifNotAuthenticated = (to, from, next) => {
//   if (!store.getters.isLoggedIn) {
//     next('/login')
//     return
//   }
//   next('/')
// }
// const ifAuthenticated = (to, from, next) => {
//   if (store.getters.isLoggedIn) {
//     next()
//     return
//   }
//   next('/login')
// }
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true
    }
    // beforeEnter: ifNotAuthenticated
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    // beforeEnter: ifAuthenticated
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard,
    meta: {
      requiresAuth: true
    }
    // beforeEnter: ifNotAuthenticated
  },

]

const router = new VueRouter({
  mode: 'history',
  routes,
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
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
