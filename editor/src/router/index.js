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
    }
  ]
})
