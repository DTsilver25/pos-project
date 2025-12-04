import { defineStore } from 'pinia'
import { AuthStatus, type User } from '../interfaces'
import { computed, ref } from 'vue'
import { checkAuthAction, loginAction, registerAction } from '../actions'

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref(AuthStatus.Checking)
  const user = ref<User | undefined>()

  const login = async (username: string, password: string) => {
    try {
      const loginResponse = await loginAction(username, password)
      if (!loginResponse.ok) {
        return false
      }
      console.log(loginResponse.user)
      user.value = loginResponse.user
      authStatus.value = AuthStatus.Authenticated
      return true
    } catch {
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
    register,
    logout,
    checkAuthStatus,
  }
})
