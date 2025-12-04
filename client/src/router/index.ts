import { createRouter, createWebHistory } from 'vue-router'
import { AuthRoutes } from '@/modules/auth/router'
import SalesList from '@/modules/sales/views/SalesList.vue'
import ProductsList from '@/modules/products/views/ProductsList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    AuthRoutes,
    { path: '/', name: 'home', component: SalesList },
    { path: '/products', name: 'products', component: ProductsList },
  ],
})

export default router
