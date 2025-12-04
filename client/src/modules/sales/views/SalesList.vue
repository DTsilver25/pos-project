<template>
  <NavBar selected="sales" />
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-3xl font-bold text-slate-800">Registros de Venta</h1>
          <p class="text-slate-600 mt-1">Total de registros: {{ data.length }}</p>
        </div>
        <RouterLink :to="{ name: 'create-sale' }">
          <span
            class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg shadow-blue-500/30 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
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
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Crear Venta
          </span>
        </RouterLink>
      </div>

      <!-- Tabla -->
      <div class="bg-white rounded-xl shadow-xl overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
                <th class="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  #
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Fecha
                </th>
                <th class="px-6 py-4 text-right text-sm font-semibold uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              <tr
                v-for="item in currentItems"
                :key="item.id"
                class="hover:bg-blue-50 transition-colors duration-150 cursor-pointer"
              >
                <td class="px-6 py-4 text-slate-700 font-medium">
                  {{ item.id }}
                </td>
                <td class="px-6 py-4 text-slate-700 font-medium">
                  {{ item.createdAt.toLocaleDateString() }}
                </td>
                <td class="px-6 py-4 text-right">
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800"
                  >
                    ${{ item.total.toFixed(2) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Paginación -->
        <div class="bg-slate-50 px-6 py-4 border-t border-slate-200">
          <div class="flex items-center justify-between flex-wrap gap-4">
            <div class="text-sm text-slate-600">
              Mostrando
              <span class="font-semibold text-slate-800">{{ indexOfFirstItem + 1 }}</span> a
              <span class="font-semibold text-slate-800">{{
                Math.min(indexOfLastItem, data.length)
              }}</span>
              de <span class="font-semibold text-slate-800">{{ data.length }}</span> registros
            </div>

            <div class="flex items-center gap-2">
              <button
                @click="handlePrevPage"
                :disabled="currentPage === 1"
                :class="[
                  'flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all duration-200',
                  currentPage === 1
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-white text-slate-700 hover:bg-slate-100 shadow-md hover:shadow-lg border border-slate-300',
                ]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Anterior
              </button>

              <div class="flex items-center gap-1">
                <button
                  v-for="page in totalPages"
                  :key="page"
                  @click="setCurrentPage(page)"
                  :class="[
                    'w-10 h-10 rounded-lg font-medium transition-all duration-200',
                    currentPage === page
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300',
                  ]"
                >
                  {{ page }}
                </button>
              </div>

              <button
                @click="handleNextPage"
                :disabled="currentPage === totalPages"
                :class="[
                  'flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all duration-200',
                  currentPage === totalPages
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-white text-slate-700 hover:bg-slate-100 shadow-md hover:shadow-lg border border-slate-300',
                ]"
              >
                Siguiente
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { getSales } from '../actions/getSales'
import type { Sale } from '../interfaces/sale'
import NavBar from '@/modules/common/components/NavBar.vue'

const currentPage = ref(1)
const itemsPerPage = ref(5)

const data = ref<Sale[]>([])

const totalPages = computed(() => {
  return Math.ceil(data.value.length / itemsPerPage.value)
})

const indexOfLastItem = computed(() => {
  return currentPage.value * itemsPerPage.value
})

const indexOfFirstItem = computed(() => {
  return indexOfLastItem.value - itemsPerPage.value
})

const currentItems = computed(() => {
  return data.value.slice(indexOfFirstItem.value, indexOfLastItem.value)
})

const handlePrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const handleNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const setCurrentPage = (page) => {
  currentPage.value = page
}

onMounted(async () => {
  const { sales } = await getSales()
  data.value = sales
})
</script>
