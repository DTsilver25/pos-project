export interface User {
  id: number
  username: string
  password: string
  role: 'cashier' | 'admin'
  createdAt: Date
}
export interface UserDTO {
  id: number
  username: string
  password: string
  role: 'cashier' | 'admin'
  created_at: Date
}

export const fromBackendToFrontEnd = (user: UserDTO): User => {
  return {
    createdAt: new Date(user.created_at),
    id: Number(user.id),
    password: user.password,
    role: user.role,
    username: user.username,
  }
}

export const fromFrontendToBackend = (user: User): UserDTO => {
  return {
    created_at: user.createdAt,
    id: user.id,
    password: user.password,
    role: user.role,
    username: user.username,
  }
}
