import api from '@/api'

export const createUser = async (data: { username: string; password: string; role: string }) => {
  const user = await api.post('/api/users/create', {
    username: data.username,
    password: data.password,
    role: data.role,
  })

  return user
}
