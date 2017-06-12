import Vue from 'vue'
import Router from 'vue-router'
import Editor from '@/components/Editor'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'editor',
      component: Editor
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/store',
      name: 'Store',
      component: About
    },
    {
      path: '/print',
      name: 'Print',
      component: About
    },
    {
      path: '/orders',
      name: 'Orders',
      component: About
    },
    {
      path: '/howitworks',
      name: 'How It Works',
      component: About
    },
    {
      path: '/FAQs',
      name: 'FAQs',
      component: About
    },
    {
      path: '/prices',
      name: 'Prices',
      component: About
    }
  ]
})
