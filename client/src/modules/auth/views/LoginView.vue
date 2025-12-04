<script lang="ts" setup>
import { reactive, ref, watchEffect } from 'vue'
import { useAuthStore } from '../stores/auth.store'
import { useToast } from 'vue-toastification'
import router from '@/router'

const authStore = useAuthStore()
const usernameInputRef = ref<HTMLInputElement | null>(null)
const passwordInputRef = ref<HTMLInputElement | null>(null)
const toast = useToast()

const myForm = reactive({
  username: '',
  password: '',
})

const onLogin = async () => {
  if (myForm.username === '') {
    return usernameInputRef.value?.focus()
  }
  if (myForm.password.length < 6) {
    return passwordInputRef.value?.focus()
  }
  if (myForm.username) {
    localStorage.setItem('username', myForm.username)
  } else {
    localStorage.removeItem('username')
  }
  const ok = await authStore.login(myForm.username, myForm.password)
  console.log(ok)
  if (ok) {
    router.replace('/')
    toast.success('Usuario autenticado correctamente')
    return
  }
  toast.error('Usuario/Contraseña no son correctos')
}

watchEffect(() => {
  const username = localStorage.getItem('username')
  if (username) {
    myForm.username = username
  }
})
</script>

<template>
  <h1 class="text-2xl font-semibold mb-4">Login</h1>
  <form @submit.prevent="onLogin" method="POST">
    <!-- Username Input -->
    <div class="mb-4">
      <label for="username" class="block text-gray-600">Nombre de usuario</label>
      <input
        ref="usernameInputRef"
        type="text"
        id="username"
        name="username"
        v-model="myForm.username"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Password Input -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Contraseña</label>
      <input
        ref="passwordInputRef"
        type="password"
        id="password"
        name="password"
        v-model="myForm.password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Login Button -->
    <button
      type="submit"
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
    >
      Iniciar sesion
    </button>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <RouterLink :to="{ name: 'register' }" class="hover:underline">Crear cuenta aqui</RouterLink>
  </div>
</template>
