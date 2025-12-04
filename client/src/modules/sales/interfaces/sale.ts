export interface Sale {
  id: number
  createdAt: Date
  paymentMethod: 'cash' | 'card'
  userId: number
  total: number
}

export interface SaleDTO {
  id: number
  created_at: Date
  payment_method: 'cash' | 'card'
  user_id: number
  total: number
}
