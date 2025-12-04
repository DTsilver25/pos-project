import api from '@/api'
import type { LoginResponse, User } from '../interfaces'
import { isAxiosError } from 'axios'

interface LoginError {
  ok: false
  message: string
}

interface LoginSuccess {
  ok: true
  user: User
  message: string
}

export const loginAction = async (
  username: string,
  password: string,
): Promise<LoginError | LoginSuccess> => {
  console.log(username, password)
  try {
    const { data } = await api.post<LoginResponse>('/api/auth/verify-user', {
      username,
      password,
    })
    return {
      ok: true,
      user: data.user,
      message: data.message,
    }
  } catch (error) {
    console.log(error)
    if (isAxiosError(error) && error.status === 401) {
      return {
        ok: false,
        message: 'Credenciales invalidas, intente de nuevo',
      }
    }
    return {
      ok: false,
      message: 'Ocurrio un error al iniciar sesion',
    }
  }
}
