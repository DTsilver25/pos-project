import { defineStore } from 'pinia'
import { AuthStatus, type User } from '../interfaces'
import { computed, ref } from 'vue'
import { checkAuthAction, loginAction } from '../actions'

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref(AuthStatus.Checking)
  const token = ref(localStorage.getItem('token') || null)
  const user = ref<User | undefined>()

  const login = async (username: string, password: string) => {
    try {
      const loginResponse = await loginAction(username, password)
      if (!loginResponse.ok) {
        return false
      }
      user.value = loginResponse.user
      localStorage.setItem('token', '123123')
      authStatus.value = AuthStatus.Authenticated
      return true
    } catch {
      return logout()
    }
  }
  const logout = () => {
    authStatus.value = AuthStatus.Unauthenticated
    user.value = undefined
    token.value = null
    localStorage.removeItem('token')
    return false
  }

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const authResponse = await checkAuthAction()
      if (!authResponse.ok) {
        logout()
        return false
      }
      authStatus.value = AuthStatus.Authenticated
      user.value = authResponse.user
      return true
    } catch {
      logout()
      return false
    }
  }
  return {
    //Properties
    authStatus,
    user,

    //Getters
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    username: computed(() => user.value?.username),

    //Methods
    login,
    logout,
    checkAuthStatus,
  }
})
