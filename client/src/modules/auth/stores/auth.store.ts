import { defineStore } from 'pinia'
import { AuthStatus, type User } from '../interfaces'
import { computed, ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { checkAuthAction, loginAction, registerAction } from '../actions'

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref(AuthStatus.Checking)
  const user = ref<User | undefined>()
  const token = ref(useLocalStorage('token', ''))

  const login = async (email: string, password: string) => {
    try {
      const loginResponse = await loginAction(email, password)
      if (!loginResponse.ok) {
        return false
      }

      user.value = loginResponse.user
      token.value = loginResponse.token
      authStatus.value = AuthStatus.Authenticated
      return true
    } catch (error) {
      console.log(error)
      return logout()
    }
  }
  const register = async (fullName: string, email: string, password: string) => {
    try {
      const registerResponse = await registerAction(fullName, email, password)
      if (!registerResponse.ok) {
        return registerResponse.message
      }
      user.value = registerResponse.user
      token.value = registerResponse.token
      authStatus.value = AuthStatus.Authenticated
      return true
    } catch (error) {
      console.log(error)
      return logout()
    }
  }
  const logout = () => {
    authStatus.value = AuthStatus.Unauthenticated
    user.value = undefined
    token.value = ''
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
      token.value = authResponse.token
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
    token,

    //Getters
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    username: computed(() => user.value?.fullName),

    //Methods
    login,
    register,
    logout,
    checkAuthStatus,
  }
})
