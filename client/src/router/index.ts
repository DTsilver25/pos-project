import { createRouter, createWebHistory } from 'vue-router'
import { AuthRoutes } from '@/modules/auth/router'
import SalesList from '@/modules/sales/views/SalesList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [AuthRoutes, { path: '/', component: SalesList }],
})

export default router
