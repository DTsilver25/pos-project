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
      <h1 class="text-lg font-semibold text-gray-900 truncate">Nuevo Producto</h1>
    </header>

    <main class="flex-1 overflow-y-auto p-6">
      <div class="max-w-md mx-auto">
        <form class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium leading-6 text-gray-900"
              >Nombre</label
            >
            <div class="mt-2">
              <input
                type="text"
                id="name"
                v-model="formData.name"
                class="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                placeholder="Ej. Papas"
              />
            </div>
          </div>

          <div>
            <label for="price" class="block text-sm font-medium leading-6 text-gray-900"
              >Price</label
            >
            <div class="mt-2">
              <input
                type="number"
                id="price"
                v-model="formData.price"
                class="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                placeholder="12.28"
              />
            </div>
          </div>
          <div>
            <label for="stock" class="block text-sm font-medium leading-6 text-gray-900"
              >Stock</label
            >
            <div class="mt-2">
              <input
                type="number"
                id="stock"
                v-model="formData.stock"
                class="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
                placeholder="5"
              />
            </div>
          </div>

          <div>
            <label for="role" class="block text-sm font-medium leading-6 text-gray-900"
              >Description</label
            >
            <textarea
              v-model="formData.description"
              class="resize-none block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
            >
            </textarea>
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
import { useToast } from 'vue-toastification'
import { createProduct } from '../actions/createProduct'

const toast = useToast()
const formData = ref({
  name: '',
  price: 0,
  stock: 0,
  description: '',
})

const router = useRouter()

const goBack = () => {
  router.back()
}

const handleSave = async () => {
  if (
    !formData.value.name.trim() ||
    !formData.value.stock ||
    !formData.value.description.trim() ||
    !formData.value.price
  ) {
    toast.error('Rellenar todos los campos')
    return
  }
  await createProduct(formData.value)
  router.back()
}
</script>
