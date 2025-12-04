<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header
      class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10"
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
      <h1 class="text-xl font-bold text-gray-800 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-6 h-6 text-indigo-600"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
        Nueva Venta
      </h1>
      <div class="text-sm text-gray-500">
        {{ new Date().toLocaleDateString() }}
      </div>
    </header>

    <main class="flex-1 p-4 md:p-6 overflow-hidden flex flex-col md:flex-row gap-6">
      <div
        class="flex-1 flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
      >
        <div class="p-4 border-b border-gray-100 bg-gray-50/50">
          <label class="block text-sm font-medium text-gray-700 mb-2">Agregar Producto</label>
          <div class="flex gap-2">
            <div class="relative flex-1">
              <select
                v-model="selectedProductId"
                class="block w-full rounded-md border-0 py-2.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
              >
                <option :value="null" disabled>Seleccione un producto...</option>
                <option v-for="prod in products" :key="prod.id" :value="prod.id">
                  {{ prod.name }} - ${{ prod.price.toFixed(2) }}
                </option>
              </select>
            </div>

            <input
              type="number"
              v-model.number="addQuantity"
              min="1"
              class="w-20 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-center"
              placeholder="Cant."
            />

            <button
              @click="addProductToCart"
              :disabled="!selectedProductId"
              class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
            >
              Agregar
            </button>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto p-0">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50 sticky top-0">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Producto
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Cant.
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="cart.length === 0">
                <td colspan="4" class="px-6 py-10 text-center text-gray-400 text-sm">
                  No hay productos en la venta actual.
                </td>
              </tr>
              <tr v-for="(item, index) in cart" :key="item.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ item.name }}
                  <div class="text-xs text-gray-500">${{ item.price.toFixed(2) }} c/u</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  <div class="flex items-center justify-center gap-2">
                    <button
                      @click="decreaseQty(index)"
                      class="text-gray-400 hover:text-red-500 font-bold px-1"
                    >
                      -
                    </button>
                    <span class="font-medium w-6 text-center">{{ item.quantity }}</span>
                    <button
                      @click="increaseQty(index)"
                      class="text-gray-400 hover:text-green-600 font-bold px-1"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium"
                >
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    @click="removeFromCart(index)"
                    class="text-red-400 hover:text-red-600 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="w-full md:w-80 flex flex-col gap-4">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Resumen de Pago</h2>

          <h2 class="text-lg font-semibold text-gray-800 mb-4">
            Le atiende: {{ cashierUsername }}
          </h2>
          <div class="flex justify-between items-end mb-6 pb-6 border-b border-gray-100">
            <span class="text-gray-500 font-medium">Total a Pagar</span>
            <span class="text-3xl font-bold text-indigo-600">${{ cartTotal.toFixed(2) }}</span>
          </div>

          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Método de Pago</label>
            <div class="relative">
              <select
                v-model="paymentMethod"
                class="block w-full rounded-md border-0 py-3 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 appearance-none bg-white"
              >
                <option value="cash">Efectivo</option>
                <option value="card">Tarjeta de Crédito/Débito</option>
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
              >
                <svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  />
                </svg>
              </div>
            </div>

            <div v-if="paymentMethod === 'cash'" class="mt-3">
              <label class="block text-xs text-gray-500 mb-1">Recibido</label>
              <div class="relative rounded-md shadow-sm">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span class="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  class="block w-full rounded-md border-0 py-1.5 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <button
              @click="processSale"
              :disabled="cart.length === 0"
              class="w-full rounded-md bg-indigo-600 px-3.5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Completar Venta
            </button>
            <button
              class="w-full rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/stores/auth.store'
import { getProducts } from '@/modules/products/actions/getProducts'
import type { Product } from '@/modules/products/interfaces/product'
import router from '@/router'
import { ref, computed, onMounted } from 'vue'
import { createSale } from '../actions/createSale'
import type { SaleRequest } from '../interfaces/sale.request'
import { useToast } from 'vue-toastification'

interface CartItem extends Product {
  quantity: number
}

const toast = useToast()
const products = ref<Product[]>([])

const { user } = useAuthStore()
// --- Estado del Componente ---
const cart = ref<CartItem[]>([])
const selectedProductId = ref<number | null>(null)
const addQuantity = ref(1)
const paymentMethod = ref<'cash' | 'credit'>('cash')

// --- Computadas ---
const cartTotal = computed(() => {
  return cart.value.reduce((total, item) => total + item.price * item.quantity, 0)
})

const cashierUsername = computed(() => user?.username)
// --- Métodos ---

// 1. Agregar producto al carrito
const addProductToCart = () => {
  if (!selectedProductId.value) return

  // Buscar el producto en la "Base de Datos"
  const productInfo = products.value.find((p) => p.id === selectedProductId.value)
  if (!productInfo) return

  // Verificar si ya está en el carrito para sumar cantidad
  const existingItemIndex = cart.value.findIndex((item) => item.id === selectedProductId.value)

  if (existingItemIndex !== -1) {
    cart.value[existingItemIndex].quantity += addQuantity.value
  } else {
    cart.value.push({
      ...productInfo,
      quantity: addQuantity.value,
    })
  }

  // Resetear inputs de selección
  selectedProductId.value = null
  addQuantity.value = 1
}

// 2. Eliminar del carrito
const removeFromCart = (index: number) => {
  cart.value.splice(index, 1)
}

// 3. Ajustar cantidades
const increaseQty = (index: number) => {
  cart.value[index].quantity++
}
const decreaseQty = (index: number) => {
  if (cart.value[index].quantity > 1) {
    cart.value[index].quantity--
  } else {
    // Opcional: Eliminar si baja de 1
    removeFromCart(index)
  }
}

// 4. Procesar la venta
const processSale = async () => {
  if (cart.value.length === 0) return

  const saleData: SaleRequest = {
    total: cartTotal.value,
    paymentMethod: paymentMethod.value,
    userId: Number(user?.id),
  }
  try {
    await createSale(saleData)
    toast.success('Pedido realizado correctamente.')
    router.replace({ name: 'home' })
  } catch {
    toast.error('Ha ocurrido un error')
  } finally {
    cart.value = []
    paymentMethod.value = 'cash'
  }
}
const goBack = () => {
  router.back()
}

onMounted(async () => {
  const data: Product[] = await getProducts()
  products.value = data
})
</script>
