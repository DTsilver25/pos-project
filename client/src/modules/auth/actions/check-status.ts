import type { LoginResponse, User } from '../interfaces'
import { isAxiosError } from 'axios'
import api from '@/api'

interface CheckError {
  ok: false
}

interface CheckSuccess {
  ok: true
  token: string
  user: User
}

export const checkAuthAction = async (): Promise<CheckError | CheckSuccess> => {
  try {
    const localToken = localStorage.getItem('token')
    if (localToken && localToken.length < 10) {
      return { ok: false }
    }
    const { data } = await api.get<LoginResponse>('/')
    return {
      ok: true,
      user: data.user,
      token: data.token,
    }
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return { ok: false }
    }
    throw new Error('No se puedo verificar la sesion')
  }
}
