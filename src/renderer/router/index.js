import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      redirect: '/create',
      component: require('@/components/LandingPage')
    },
    {
      path: '/create',
      name: 'create-project',
      component: require('@/components/Create')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
