import Vue from 'vue'
// import VueRouter from 'vue-router'
import VueRouter from "../VueRouter/VueRouter";
import Home from '../views/Home.vue'


const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children: [{
      path: 'news',
      name: 'News',
      component: () => import('../components/News')
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach(((to, from, next) => {
  // next('/about/news')
  next()
  // setTimeout(()=>next(0),1000)
  // console.log(to, from ,next, 333)
}))
export default router
Vue.use(VueRouter)
