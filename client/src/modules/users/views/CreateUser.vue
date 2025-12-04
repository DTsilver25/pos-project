<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header
      class="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 flex items-center sticky top-0 z-10"
    >
      <button
        @click="goBack"
        type="button"
        class="inline-flex items-center p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 mr-3 transition-colors"
        aria-label="Volver atrás"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
      </button>
      <h1 class="text-lg font-semibold text-gray-900 truncate">Nuevo Usuario</h1>
    </header>

    <main class="flex-1 overflow-y-auto p-6">
      <div class="max-w-md mx-auto">
        <form class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium leading-6 text-gray-900"
              >Nombre completo</label
            >
            <div class="mt-2">
              <input
                type="text"
                id="name"
                v-model="formData.username"
                class="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                placeholder="Ej. Juan Pérez"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
              >Contraseña</label
            >
            <div class="mt-2">
              <input
                type="password"
                id="password"
                v-model="formData.password"
                class="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <label for="role" class="block text-sm font-medium leading-6 text-gray-900"
              >Rol de usuario</label
            >
            <div class="mt-2 relative">
              <select
                id="role"
                v-model="formData.role"
                class="block w-full rounded-md border-0 py-3 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white appearance-none"
              >
                <option value="" disabled>Selecciona un rol</option>
                <option v-for="role in rolesList" :key="role.id" :value="role.id">
                  {{ role.name }}
                </option>
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
              >
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>

    <footer class="bg-white border-t border-gray-200 p-4 sticky bottom-0 z-10">
      <div class="max-w-md mx-auto flex items-center justify-center">
        <button
          type="button"
          @click="handleSave"
          class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full sm:w-auto text-center"
        >
          Crear Usuarios
        </button>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createUser } from '../actions/createUser'
import { useToast } from 'vue-toastification'

const toast = useToast()
const formData = ref({
  username: '', // Valor inicial para ver el título dinámico
  password: '',
  role: '',
})

// Lista de roles disponibles
const rolesList = [
  { id: 'admin', name: 'Administrador' },
  { id: 'cashier', name: 'Vendedor' },
]

const router = useRouter()

const goBack = () => {
  router.back()
  // Si no, puedes emitir un evento: emit('close');
}

const handleSave = async () => {
  if (!formData.value.username.trim() || !formData.value.password.trim() || !formData.value.role) {
    toast.error('Rellenar todos los campos')
    return
  }
  const user = await createUser(formData.value)
  if (!user) {
    toast.error('Ha ocurrido un error')
    return
  }
  toast.success('Usuario creado correctamente')
  router.back()
}
</script>
