import { createRouter, createWebHistory } from 'vue-router'
import SalesList from '@/modules/sales/views/SalesList.vue'
import ProductsList from '@/modules/products/views/ProductsList.vue'
import UsersList from '@/modules/users/views/UsersList.vue'
import CreateUser from '@/modules/users/views/CreateUser.vue'
import CreateSale from '@/modules/sales/views/CreateSale.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // --- RUTAS PÚBLICAS (No requieren autenticación) ---
    {
      path: '/auth',
      name: 'auth',
      redirect: { name: 'login' },
      component: () => import('@/modules/auth/layouts/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/modules/auth/views/LoginView.vue'),
        },
      ],
    },

    // --- RUTAS PRIVADAS (Requieren autenticación) ---
    {
      path: '/',
      name: 'home',
      component: SalesList,
      meta: { requiresAuth: true }, // <--- Esta marca indica que es privada
    },
    {
      path: '/sales/create',
      name: 'create-sale',
      component: CreateSale,
      meta: { requiresAuth: true },
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsList,
      meta: { requiresAuth: true },
    },
    {
      path: '/users',
      name: 'users',
      component: UsersList,
      meta: { requiresAuth: true },
    },
    {
      path: '/user/create',
      name: 'create-user',
      component: CreateUser,
      meta: { requiresAuth: true },
    },
  ],
})

// --- GUARDIA DE NAVEGACIÓN ---
router.beforeEach((to, from, next) => {
  // 1. Verificamos si la ruta a la que quiere ir requiere auth
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  // 2. Verificamos si el usuario tiene un token (Aquí asumo que lo guardas en localStorage)
  // Si usas Pinia, aquí importarías tu store
  const isAuthenticated = localStorage.getItem('token')

  if (requiresAuth && !isAuthenticated) {
    // Si requiere auth y NO está logueado -> Mandar al Login
    next({ name: 'login' })
  } else if (isAuthenticated && to.name === 'login') {
    // (Opcional) Si YA está logueado e intenta ir al login -> Mandar al Home
    next({ name: 'home' })
  } else {
    // Si todo está bien -> Dejar pasar
    next()
  }
})

export default router
