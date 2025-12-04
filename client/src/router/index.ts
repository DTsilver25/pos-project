import { createRouter, createWebHistory } from 'vue-router'
import { AuthRoutes } from '@/modules/auth/router'
import SalesList from '@/modules/sales/views/SalesList.vue'
import ProductsList from '@/modules/products/views/ProductsList.vue'
import UsersList from '@/modules/users/views/UsersList.vue'
import CreateUser from '@/modules/users/views/CreateUser.vue'
import CreateSale from '@/modules/sales/views/CreateSale.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    AuthRoutes,
    { path: '/', name: 'home', component: SalesList },
    {
      path: '/sales/create',
      name: 'create-sale',
      component: CreateSale,
    },
    { path: '/products', name: 'products', component: ProductsList },
    {
      path: '/users',
      name: 'users',
      component: UsersList,
    },
    {
      path: '/user/create',
      name: 'create-user',
      component: CreateUser,
    },
  ],
})

export default router
