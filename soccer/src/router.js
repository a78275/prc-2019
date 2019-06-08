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
    },
    {
      path: '/teams',
      name: 'teams',
      component: () => import('./views/Teams.vue')
    },
    {
      path: '/teams/:id',
      name: 'team',
      component: () => import('./views/Team.vue')
    },
    {
      path: '/internationalTeams',
      name: 'internationalTeams',
      component: () => import('./views/InternationalTeams.vue')
    }
  ]
})
