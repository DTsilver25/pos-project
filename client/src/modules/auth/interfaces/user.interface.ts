export interface User {
  id: string
  username: string
  isActive: boolean
  roles: 'admin' | 'cashier'
}
