import Home from '@/pages/Home'
import Forum from '@/pages/Forum'
import ThreadShow from '@/pages/ThreadShow'
import NotFound from '@/pages/NotFound'
import Category from '@/pages/Category'
import Profile from '@/pages/Profile'
import sourceData from '@/data.json'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: Category,
    props: true
  },
  {
    path: '/forum/:id',
    name: 'Forum',
    component: Forum,
    props: true
  },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    component: ThreadShow,
    props: true,
    beforeEnter (to, from, next) {
      // Check if thread exists.
      const threadExists = sourceData.threads.find(thread => thread.id === to.params.id)
      if (threadExists) {
        return next()
      } else {
        next({
          name: 'NotFound',
          params: {
            pathMatch: to.path.substring(1).split('/')
          },
          query: to.query,
          hash: to.hash
        })
      }
    }
  },
  {
    path: '/me',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/me/edit',
    name: 'ProfileEdit',
    component: Profile,
    props: {
      edit: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
