<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/stores/auth.store'
import router from '@/router'
import { useToast } from 'vue-toastification'

const authStore = useAuthStore()
const toast = useToast()

const onLogout = () => {
  authStore.logout()
  toast.success('Cierre de sesion exitoso')
  router.replace('/auth')
}
</script>

<template>
  <nav class="flex items-center justify-around bg-gray-200 h-20">
    <div>
      <h1 class="text-2xl">POS - Abarrotes</h1>
    </div>
    <ul class="flex gap-5">
      <li><RouterLink :to="{ name: 'home' }">Ventas</RouterLink></li>
      <li><RouterLink :to="{ name: 'products' }">Productos</RouterLink></li>
      <!-- <li><RouterLink :to="{ name: 'users' }">Users</RouterLink></li> -->
    </ul>
    <div>
      <button @click="onLogout" type="button" class="bg-red-500 text-white py-2 px-4 rounded-lg">
        Cerrar Sesion
      </button>
    </div>
  </nav>
</template>
