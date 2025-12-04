import api from '@/api'
import { fromBackendToFrontEnd, type UserDTO } from '../interfaces/user'

export const getUsers = async () => {
  const { data } = await api.get('/api/users')
  const users: UserDTO[] = data.users
  return users.map((user) => {
    return fromBackendToFrontEnd(user)
  })
}
