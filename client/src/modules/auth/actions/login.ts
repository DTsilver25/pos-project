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
  token: string
}

export const loginAction = async (
  email: string,
  password: string,
): Promise<LoginError | LoginSuccess> => {
  try {
    const { data } = await api.post<LoginResponse>('/api/auth', {
      email,
      password,
    })
    return {
      ok: true,
      user: data.user,
      token: data.token,
    }
  } catch (error) {
    if (isAxiosError(error) && error.status === 401) {
      return {
        ok: false,
        message: 'Credenciales invalidas, intente de nuevo',
      }
    }
    console.log(error)
    return {
      ok: false,
      message: 'Ocurrio un error al iniciar sesion',
    }
  }
}
