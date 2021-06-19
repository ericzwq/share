import Vue from 'vue'
import VueRouter from 'vue-router'
// import VueRouter from '../Vue-Router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL, // 此处在vue.config.js中设置为'/base', 但process.env.BASE_URL 的值为'/base/'(结尾多了'/')
  routes
})
console.log(router.getRoutes())
router.addRoutes([{path: '/', name: '/', component: Home}])
router.options.routes = []
console.log(router.getRoutes())
export default router
