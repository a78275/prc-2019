import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Index.vue')
    },
    {
      path: '/leagues',
      name: 'leagues',
      component: () => import('./views/Leagues.vue')
    },
    {
      path: '/leagues/:id',
      name: 'league',
      component: () => import('./views/League.vue')
    }
  ]
})
