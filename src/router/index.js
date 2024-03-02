import { createRouter, createWebHistory } from 'vue-router'
import TrackerEdit from '../views/TrackerEdit.vue'
import Login from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TrackerEdit
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/edit',
      name: 'edit',
      component: TrackerEdit
    },
    {
      path: '/view',
      name: 'view',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TrackerView.vue')
    }
  ]
})

export default router
