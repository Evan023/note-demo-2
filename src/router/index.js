import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'AllNotes',
        component: () => import('@/views/notes/AllNotes.vue')
      },
      {
        path: 'trash',
        name: 'Trash',
        component: () => import('@/views/notes/Trash.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router 