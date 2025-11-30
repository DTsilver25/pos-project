<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useAuthStore } from '../stores/auth.store'
import { useToast } from 'vue-toastification'

const nameInput = ref<HTMLInputElement | null>(null)
const emailInput = ref<HTMLInputElement | null>(null)
const passwordInput = ref<HTMLInputElement | null>(null)

const toast = useToast()
const authStore = useAuthStore()
const formData = reactive({
  fullName: '',
  email: '',
  password: '',
})

const onRegister = async () => {
  if (formData.fullName === '') {
    nameInput.value?.focus()
    return
  }
  if (formData.email === '') {
    emailInput.value?.focus()
    return
  }
  if (formData.password.length < 6) {
    passwordInput.value?.focus()
    return
  }
  const ok = await authStore.register(formData.fullName, formData.email, formData.password)
  if (!ok) {
    toast.error('Ha ocurrido un error')
    return
  }
  toast.success('Usuario creado correctamente')
}
</script>

<template>
  <h1 class="text-2xl font-semibold mb-4">Registrate</h1>
  <form @submit.prevent="onRegister" method="POST">
    <!-- Username Input -->
    <div class="mb-4">
      <label for="name" class="block text-gray-600">Name</label>
      <input
        ref="nameInput"
        type="text"
        id="name"
        name="name"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        v-model="formData.fullName"
        required
        autocomplete="off"
      />
    </div>

    <!-- Username Input -->
    <div class="mb-4">
      <label for="email" class="block text-gray-600">Correo</label>
      <input
        ref="emailInput"
        type="email"
        id="email"
        name="email"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        v-model="formData.email"
        required
        autocomplete="off"
      />
    </div>
    <!-- Password Input -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Contraseña</label>
      <input
        ref="passwordInput"
        type="password"
        id="password"
        name="password"
        v-model="formData.password"
        required
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Forgot Password Link -->
    <div class="mb-6 text-blue-500">
      <a href="#" class="hover:underline">¿Olvidaste tu contraseña?</a>
    </div>
    <!-- Login Button -->
    <button
      type="submit"
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
    >
      Registrate
    </button>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <RouterLink :to="{ name: 'login' }" class="hover:underline">Ingresa aqui</RouterLink>
  </div>
</template>
