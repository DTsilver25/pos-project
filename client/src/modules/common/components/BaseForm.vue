<template>
  <div
    class="h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-6"
  >
    <div class="w-full max-w-2xl">
      <!-- Card Principal -->
      <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
          <h2 class="text-3xl font-bold text-white">Información del Producto</h2>
          <p class="text-indigo-100 mt-1">Complete los datos del producto</p>
        </div>

        <!-- Formulario -->
        <form @submit.prevent="handleSubmit" class="p-8 space-y-6">
          <!-- Nombre -->
          <div>
            <label for="nombre" class="block text-sm font-semibold text-gray-700 mb-2">
              Nombre del Producto
            </label>
            <input
              id="nombre"
              v-model="formData.nombre"
              type="text"
              required
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
              placeholder="Ej: Laptop Dell XPS 15"
            />
          </div>

          <!-- Stock y Precio en Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Stock -->
            <div>
              <label for="stock" class="block text-sm font-semibold text-gray-700 mb-2">
                Stock Disponible
              </label>
              <input
                id="stock"
                v-model.number="formData.stock"
                type="number"
                required
                min="0"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                placeholder="0"
              />
            </div>

            <!-- Precio -->
            <div>
              <label for="precio" class="block text-sm font-semibold text-gray-700 mb-2">
                Precio ($)
              </label>
              <input
                id="precio"
                v-model.number="formData.precio"
                type="number"
                required
                min="0"
                step="0.01"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
                placeholder="0.00"
              />
            </div>
          </div>

          <!-- Descripción -->
          <div>
            <label for="descripcion" class="block text-sm font-semibold text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              id="descripcion"
              v-model="formData.descripcion"
              required
              rows="4"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none resize-none"
              placeholder="Describa las características principales del producto..."
            ></textarea>
          </div>

          <!-- Resumen -->
          <div
            class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-100"
          >
            <div class="flex justify-between items-center text-sm">
              <span class="text-gray-600">Stock Total:</span>
              <span class="font-bold text-gray-800">{{ formData.stock || 0 }} unidades</span>
            </div>
            <div class="flex justify-between items-center text-sm mt-2">
              <span class="text-gray-600">Valor en Inventario:</span>
              <span class="font-bold text-indigo-600">${{ valorInventario }}</span>
            </div>
          </div>

          <!-- Botones -->
          <div class="flex gap-4 pt-4">
            <button
              type="submit"
              class="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              Guardar Producto
            </button>

            <button
              type="button"
              @click="handleDelete"
              class="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg shadow-red-500/30 transition-all duration-200 hover:shadow-xl hover:shadow-red-500/40 hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path
                  d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                ></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
              Eliminar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const formData = ref({
  nombre: '',
  stock: 0,
  descripcion: '',
  precio: 0,
})

const valorInventario = computed(() => {
  const total = (formData.value.stock || 0) * (formData.value.precio || 0)
  return total.toFixed(2)
})

const handleSubmit = () => {
  alert(
    `Producto guardado:\n\nNombre: ${formData.value.nombre}\nStock: ${formData.value.stock}\nPrecio: $${formData.value.precio}\nDescripción: ${formData.value.descripcion}`,
  )

  // Aquí puedes agregar tu lógica para guardar
  // Por ejemplo: await saveProduct(formData.value)
}

const handleDelete = () => {
  if (confirm('¿Está seguro que desea eliminar este producto?')) {
    alert('Producto eliminado')

    // Limpiar formulario
    formData.value = {
      nombre: '',
      stock: 0,
      descripcion: '',
      precio: 0,
    }

    // Aquí puedes agregar tu lógica para eliminar
    // Por ejemplo: await deleteProduct(productId)
  }
}
</script>

<style scoped>
/* Animación para inputs en focus */
input:focus,
textarea:focus {
  transform: translateY(-2px);
}
</style>
