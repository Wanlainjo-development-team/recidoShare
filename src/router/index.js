// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: ':user',
        name: 'User',
        component: () => import('@/views/User.vue'),

        children: [
          {
            path: '',
            name: 'UserProfile',
            component: () => import('@/views/UserProfile.vue'),
          },
          {
            path: ':invoice',
            name: 'Invoice',
            component: () => import('@/views/Invoice.vue'),
          },
        ]
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
