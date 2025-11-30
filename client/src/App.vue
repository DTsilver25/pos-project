<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { AuthStatus } from './modules/auth/interfaces'
import { useAuthStore } from './modules/auth/stores/auth.store'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

authStore.$subscribe(
  (_, state) => {
    if (route.path.includes('/auth') && state.authStatus === AuthStatus.Authenticated) {
      router.replace({ name: 'home' })
    }
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <RouterView />
</template>
