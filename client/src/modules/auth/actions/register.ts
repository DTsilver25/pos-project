import api from '@/api'
import type { LoginResponse, User } from '../interfaces'

interface SuccesfullMessage {
  ok: true
  user: User
  token: string
}

interface ErrorMessage {
  ok: false
  message: string
}

export const registerAction = async (
  fullName: string,
  email: string,
  password: string,
): Promise<SuccesfullMessage | ErrorMessage> => {
  try {
    const { data } = await api.post<LoginResponse>('/auth/register', {
      fullName,
      email,
      password,
    })
    return { ok: true, user: data.user, token: data.token }
  } catch (error) {
    return {
      ok: false,
      message: 'Ha ocurrido un error',
    }
  }
}
